export type Article = {
  id: number;
  title: string;
  description: string;
  category: string;
  readTime: string;
};

export const articles: Article[] = [
  {
    id: 1,
    title: "Troubleshooting Network Issues",
    description:
      "Learn how to diagnose and fix common network problems like connectivity loss, slow speeds, and DNS errors.",
    category: "Networking",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Resetting and Managing Active Directory Accounts",
    description:
      "A step-by-step guide to resetting user passwords, unlocking accounts, and handling permission issues.",
    category: "Active Directory",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Email Configuration and Syncing Issues",
    description:
      "Understand the root causes of Outlook and mobile email sync problems, and how to resolve them efficiently.",
    category: "Email Support",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Disk Space and Performance Optimization",
    description:
      "Learn techniques for freeing up disk space, identifying resource hogs, and improving system performance.",
    category: "System Maintenance",
    readTime: "8 min read",
  },
];
