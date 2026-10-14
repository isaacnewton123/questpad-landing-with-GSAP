export interface PolicySectionItem {
  title: string;
  content: string;
}

export const PRIVACY_SECTIONS: PolicySectionItem[] = [
  {
    title: "1. Information We Collect",
    content: "When you use QuestPad via Telegram, we collect basic information provided by the Telegram API (such as your Telegram ID, username, and language preference) and your connected TON Wallet address to facilitate rewards and gameplay. We do not collect personal identifying information such as real names, physical addresses, emails, or phone numbers unless explicitly provided by you for support purposes."
  },
  {
    title: "2. How We Use Your Data",
    content: "Your data is used exclusively for the core functions of QuestPad: maintaining your account ledger, verifying completed quests and ad views (via server-to-server validation with Adsgram/Monetag), preventing fraudulent activity, executing withdrawals to your TON wallet via the blockchain, and improving our overall user experience."
  },
  {
    title: "3. Third-Party Services and Advertising",
    content: "We integrate with third-party advertising networks (including Adsgram and Monetag) to serve rewarded advertisements. These providers may collect anonymous device data, advertising IDs, and IP addresses to serve relevant ads. Furthermore, we interact with the TON Blockchain and public node APIs to process and verify decentralized transactions."
  },
  {
    title: "4. Blockchain Transactions",
    content: "Please be aware that any transactions executed on the TON Blockchain (such as withdrawals and rewards distribution) are inherently public. Your wallet address and transaction history are permanently recorded on a decentralized, public ledger and cannot be altered or deleted by QuestPad."
  },
  {
    title: "5. Data Security",
    content: "We employ robust industry-standard security measures, including strictly enforced Row-Level Security (RLS) on our databases and atomic transactions, to protect your in-game balance and withdrawal history from unauthorized access, alteration, or data breaches."
  },
  {
    title: "6. Data Retention",
    content: "We retain your data for as long as your account remains active. Because we operate within the Telegram ecosystem, deleting your Telegram account or completely blocking the QuestPad bot may restrict your access to the platform, though immutable ledger data will remain securely stored."
  },
  {
    title: "7. Your Rights",
    content: "You maintain the right to request the deletion of your account and associated off-chain data at any time. To exercise these rights, please contact our support team. As noted, on-chain public data cannot be erased under the 'Right to be Forgotten'."
  },
  {
    title: "8. Children's Privacy",
    content: "QuestPad is not intended for individuals under the age of 18 or the age of legal majority in your jurisdiction. We do not knowingly collect personal information from children. If we become aware that we have collected such data, it will be deleted immediately."
  },
  {
    title: "9. Changes to Privacy Policy",
    content: "We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated 'Last Updated' date. Continued use of the application after modifications signifies your acceptance of the revised terms."
  }
];
