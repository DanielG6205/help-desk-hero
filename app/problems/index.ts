export type Problem = {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
};

export const problems: Problem[] = [
  {
    id: 1,
    name: "Reset AD Password",
    difficulty: "Easy",
    skills: ["Active Directory", "User Management"],
  },
  {
    id: 2,
    name: "VPN Connection Failure",
    difficulty: "Medium",
    skills: ["Networking", "Troubleshooting"],
  },
  {
    id: 3,
    name: "Email Not Syncing",
    difficulty: "Medium",
    skills: ["Exchange", "Mobile Device Support"],
  },
  {
    id: 4,
    name: "Disk Space Critical",
    difficulty: "Hard",
    skills: ["OS", "Diagnostics", "System Cleanup"],
  },
];
