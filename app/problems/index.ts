export type Problem = {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  rdpFile: string;
  instructions: string[]; 
};

export const problems: Problem[] = [
  {
    id: 1,
    name: "Reset AD Password",
    difficulty: "Easy",
    skills: ["Active Directory", "User Management"],
    rdpFile: "/rdp/problem-1.rdp",
    instructions: [
      "Open Active Directory Users and Computers (ADUC).",
      "Locate the user account that needs a password reset.",
      "Right-click the user and select 'Reset Password'.",
      "Choose a secure temporary password.",
      "Enable ‘User must change password at next logon’.",
      "Save your changes."
    ]
  },
  {
    id: 2,
    name: "VPN Connection Failure",
    difficulty: "Medium",
    skills: ["Networking", "Troubleshooting"],
    rdpFile: "/rdp/problem-2.rdp",
    instructions: [
      "Verify network connectivity using Command Prompt.",
      "Check DNS resolution for VPN gateway.",
      "Ensure VPN credentials are correct.",
      "Restart the VPN client service.",
      "Try connecting again and document the outcome."
    ]
  },
  {
    id: 3,
    name: "Email Not Syncing",
    difficulty: "Medium",
    skills: ["Exchange", "Mobile Device Support"],
    rdpFile: "/rdp/problem-3.rdp",
    instructions: [
      "Check if Outlook or Mail app is connected.",
      "Verify the user's mailbox credentials.",
      "Restart the device's email app.",
      "Remove and re-add the email account.",
      "Confirm email synchronization is restored."
    ]
  },
  {
    id: 4,
    name: "Disk Space Critical",
    difficulty: "Hard",
    skills: ["OS", "Diagnostics", "System Cleanup"],
    rdpFile: "/rdp/problem-4.rdp",
    instructions: [
      "Open File Explorer and check drive usage.",
      "Run Disk Cleanup to remove system junk.",
      "Check for large log files in temp directories.",
      "Uninstall unnecessary applications.",
      "Free at least 2–5GB of storage space."
    ]
  }
];
