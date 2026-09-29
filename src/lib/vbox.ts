const textEncoder = new TextEncoder()

const crcTable = new Uint32Array(256).map((_, index) => {
  let crc = index
  for (let bit = 0; bit < 8; bit += 1) {
    crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
  }
  return crc >>> 0
})

const crc32 = (data: Uint8Array): number => {
  let crc = 0xffffffff
  for (const byte of data) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

const uuid = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

const vboxUuidBytes = (id: string): Uint8Array => {
  const hex = id.replaceAll("-", "")
  const raw = new Uint8Array(16)
  for (let index = 0; index < 16; index += 1) raw[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16)
  const out = new Uint8Array(16)
  out[0] = raw[3]
  out[1] = raw[2]
  out[2] = raw[1]
  out[3] = raw[0]
  out[4] = raw[5]
  out[5] = raw[4]
  out[6] = raw[7]
  out[7] = raw[6]
  out.set(raw.slice(8), 8)
  return out
}

const u32 = (view: DataView, offset: number, value: number) => view.setUint32(offset, value, true)
const u64 = (view: DataView, offset: number, value: bigint) => view.setBigUint64(offset, value, true)

export const createDynamicVdi = (sizeBytes: number, diskUuid: string): Uint8Array => {
  const blockSize = 1024 * 1024
  const blocks = Math.ceil(sizeBytes / blockSize)
  const offBlocks = 512
  const offData = offBlocks + blocks * 4
  const file = new Uint8Array(offData)
  const view = new DataView(file.buffer)
  const info = textEncoder.encode("<<< Oracle VM VirtualBox Disk Image >>>\n")
  file.set(info, 0)
  u32(view, 64, 0xbeda107f)
  u32(view, 68, 0x00010001)
  u32(view, 72, 400)
  u32(view, 76, 1)
  u32(view, 340, offBlocks)
  u32(view, 344, offData)
  const heads = 16
  const sectors = 63
  const cylinders = Math.floor(sizeBytes / (heads * sectors * 512))
  u32(view, 348, cylinders)
  u32(view, 352, heads)
  u32(view, 356, sectors)
  u32(view, 360, 512)
  u64(view, 368, BigInt(sizeBytes))
  u32(view, 376, blockSize)
  u32(view, 384, blocks)
  u32(view, 388, 0)
  file.set(vboxUuidBytes(diskUuid), 392)
  file.set(vboxUuidBytes(diskUuid), 408)
  u32(view, 456, cylinders)
  u32(view, 460, heads)
  u32(view, 464, sectors)
  u32(view, 468, 512)
  for (let index = 0; index < blocks; index += 1) u32(view, offBlocks + index * 4, 0xffffffff)
  return file
}

const xmlEscape = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;")

export type Firmware = "BIOS" | "EFI"

export const firmwareFor = (version: string): Firmware => {
  const [major = 0, minor = 0, patch = 0] = version.replace(/^v/i, "").split(".").map((part) => Number(part) || 0)
  if (major > 1 || minor > 0 || patch >= 4) return "BIOS"
  return "EFI"
}

export const machineXml = (isoName: string, diskUuid: string, isoUuid: string, machineUuid: string, firmware: Firmware): string => `<?xml version="1.0"?>
<VirtualBox xmlns="http://www.virtualbox.org/" version="1.19-windows">
  <Machine uuid="{${machineUuid}}" name="Aegis OS" OSType="ArchLinux_64" snapshotFolder="Snapshots" lastStateChange="2026-09-29T12:00:00Z">
    <MediaRegistry>
      <HardDisks>
        <HardDisk uuid="{${diskUuid}}" location="Aegis OS.vdi" format="VDI" type="Normal"/>
      </HardDisks>
      <DVDImages>
        <Image uuid="{${isoUuid}}" location="${xmlEscape(isoName)}"/>
      </DVDImages>
    </MediaRegistry>
    <Hardware>
      <CPU count="2">
        <HardwareVirtEx enabled="true"/>
        <LongMode enabled="true"/>
      </CPU>
      <Memory RAMSize="2048"/>
      <Firmware type="${firmware}"/>
      <Boot>
        <Order position="1" device="DVD"/>
        <Order position="2" device="HardDisk"/>
        <Order position="3" device="None"/>
        <Order position="4" device="None"/>
      </Boot>
      <Display controller="VMSVGA" VRAMSize="128"/>
      <BIOS>
        <IOAPIC enabled="true"/>
      </BIOS>
      <USB>
        <Controllers>
          <Controller name="OHCI" type="OHCI"/>
        </Controllers>
      </USB>
      <Network>
        <Adapter slot="0" enabled="true" MACAddress="080027A1E615" type="82540EM">
          <NAT/>
        </Adapter>
      </Network>
      <AudioAdapter controller="AC97" useDefault="true" driver="Default" enabled="true"/>
      <RTC localOrUTC="UTC"/>
    </Hardware>
    <StorageControllers>
      <StorageController name="SATA" type="AHCI" PortCount="2" useHostIOCache="false" Bootable="true" IDE0MasterEmulationPort="0" IDE0SlaveEmulationPort="1" IDE1MasterEmulationPort="2" IDE1SlaveEmulationPort="3">
        <AttachedDevice type="HardDisk" hotpluggable="false" port="0" device="0">
          <Image uuid="{${diskUuid}}"/>
        </AttachedDevice>
        <AttachedDevice passthrough="false" type="DVD" hotpluggable="false" port="1" device="0">
          <Image uuid="{${isoUuid}}"/>
        </AttachedDevice>
      </StorageController>
    </StorageControllers>
  </Machine>
</VirtualBox>
`

const readme = (isoName: string, firmware: Firmware): string => `Aegis OS VirtualBox machine

1. Download ${isoName} from the Aegis OS download page.
2. Put that ISO in this folder. Keep the file name unchanged.
3. Double-click "Aegis OS.vbox".
4. Start the machine. Firmware is already set to ${firmware}. The live desktop boots from the virtual DVD.
5. The 16 GiB disk is empty until the installer writes it.

Images from 1.0.4 onward use BIOS, so EFI stays off. Earlier images use EFI.
`

const storeZip = (files: { name: string; data: Uint8Array }[]): Uint8Array => {
  const locals: Uint8Array[] = []
  const centrals: Uint8Array[] = []
  let offset = 0
  for (const file of files) {
    const name = textEncoder.encode(file.name)
    const crc = crc32(file.data)
    const local = new Uint8Array(30 + name.length)
    const localView = new DataView(local.buffer)
    localView.setUint32(0, 0x04034b50, true)
    localView.setUint16(4, 20, true)
    localView.setUint16(8, 0, true)
    localView.setUint32(14, crc, true)
    localView.setUint32(18, file.data.length, true)
    localView.setUint32(22, file.data.length, true)
    localView.setUint16(26, name.length, true)
    local.set(name, 30)
    locals.push(local, file.data)
    const central = new Uint8Array(46 + name.length)
    const centralView = new DataView(central.buffer)
    centralView.setUint32(0, 0x02014b50, true)
    centralView.setUint16(4, 20, true)
    centralView.setUint16(6, 20, true)
    centralView.setUint32(16, crc, true)
    centralView.setUint32(20, file.data.length, true)
    centralView.setUint32(24, file.data.length, true)
    centralView.setUint16(28, name.length, true)
    centralView.setUint32(42, offset, true)
    central.set(name, 46)
    centrals.push(central)
    offset += local.length + file.data.length
  }
  const centralSize = centrals.reduce((sum, part) => sum + part.length, 0)
  const end = new Uint8Array(22)
  const endView = new DataView(end.buffer)
  endView.setUint32(0, 0x06054b50, true)
  endView.setUint16(8, files.length, true)
  endView.setUint16(10, files.length, true)
  endView.setUint32(12, centralSize, true)
  endView.setUint32(16, offset, true)
  const total = offset + centralSize + end.length
  const zip = new Uint8Array(total)
  let cursor = 0
  for (const part of locals) {
    zip.set(part, cursor)
    cursor += part.length
  }
  for (const part of centrals) {
    zip.set(part, cursor)
    cursor += part.length
  }
  zip.set(end, cursor)
  return zip
}

export const buildVirtualBoxZip = (isoName: string, firmware: Firmware): Uint8Array => {
  const diskUuid = uuid()
  const isoUuid = uuid()
  const machineUuid = uuid()
  const sixteenGib = 16 * 1024 * 1024 * 1024
  return storeZip([
    { name: "Aegis OS.vbox", data: textEncoder.encode(machineXml(isoName, diskUuid, isoUuid, machineUuid, firmware)) },
    { name: "Aegis OS.vdi", data: createDynamicVdi(sixteenGib, diskUuid) },
    { name: "README.txt", data: textEncoder.encode(readme(isoName, firmware)) },
  ])
}

export const downloadVirtualBoxZip = (isoName: string, firmware: Firmware) => {
  const zip = buildVirtualBoxZip(isoName, firmware)
  const blob = new Blob([zip.buffer as ArrayBuffer], { type: "application/zip" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "Aegis-OS-VirtualBox.zip"
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1500)
}
