export type Faq = {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: "What is Aegis OS?",
    answer:
      "Aegis OS is a free, ultra-lightweight operating system built on Arch Linux. The live image boots a GTK4 desktop and a graphical installer. The installed system uses the same session, pacman, and systemd-boot.",
  },
  {
    question: "Is it based on Arch Linux?",
    answer:
      "Yes. The userland is Arch: systemd, pacman, and the core and extra repositories. Aegis adds its own desktop packages, installer, and an optional kernel package named linux-aegis.",
  },
  {
    question: "Which computers can boot the image?",
    answer:
      "The image is built for x86_64 PCs with BIOS or UEFI firmware. The installer accepts a whole disk of at least 8 GiB. UEFI gets a 1 GiB EFI system partition. BIOS gets one bootable root partition.",
  },
  {
    question: "Does it boot with legacy BIOS or on ARM?",
    answer:
      "Version 1.0.4 and newer boot on legacy BIOS and UEFI. The image is x86_64 only. Turn Secure Boot off. In VirtualBox, leave EFI off and attach the ISO, or use the VirtualBox machine from the download page.",
  },
  {
    question: "Which kernel does a new install use?",
    answer:
      "The source profile currently installs the Arch linux package so an image can be built before linux-aegis is published. After that package is in the Aegis repository, release builds switch the image to linux-aegis 6.18 longterm.",
  },
  {
    question: "Does Aegis replace pacman?",
    answer:
      "No. pacman remains the package manager. The aegis-pkg application lists, installs, and removes packages from the aegis repository by calling pacman.",
  },
  {
    question: "Where do I download the ISO?",
    answer:
      "Published images are listed on the download page. Each file is a GitHub release asset produced when a version tag is pushed from the aegis-os repository. Until the first tag is published, that list is empty.",
  },
  {
    question: "How large is the download?",
    answer:
      "Each release card shows the file size reported by GitHub. The size is the built image, so it is not fixed in advance.",
  },
  {
    question: "Does Secure Boot work?",
    answer:
      "Secure Boot is not configured. The image uses systemd-boot installed by bootctl and does not ship a firmware-trusted shim. Disable Secure Boot to boot the live image and the installed system.",
  },
  {
    question: "What does the installer do to the selected disk?",
    answer:
      "It writes a new GPT, a 1 GiB FAT32 EFI partition labeled AEGIS_ESP, and a root partition formatted ext4 or btrfs and labeled aegis. The previous contents of that whole disk are replaced. The installer asks you to type the disk name before it starts.",
  },
  {
    question: "Can I sign in as root?",
    answer:
      "The installed system locks the root password. You sign in as the user created by the installer. That user is in the wheel group and can use sudo. The live image signs in automatically as the user live.",
  },
  {
    question: "Can I use the Aegis repository on another Arch system?",
    answer:
      "Yes. Add the aegis repository to pacman.conf. The server is the rolling x86_64 GitHub release. Signature checking stays optional until the published keyring is installed and you switch the repository to required signatures.",
  },
  {
    question: "What license covers the project?",
    answer:
      "The operating system userspace and this website are GPL-3.0-only. The kernel package is GPL-2.0-only, matching the Linux kernel.",
  },
]
