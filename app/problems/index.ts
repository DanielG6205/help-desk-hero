export type Problem = {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  skills: string[];
  serverRdpFile: string;
  workshopRdpFile: string;
  instructions: string[];
  completionKey: string;

  labScenario: string[];
  labTasks: string[];
  expectedOutcome: string[];
};

export const problems: Problem[] = [
  {
    id: 1,
    name: "Shared Folder Access – AD Group Permissions",
    difficulty: "Easy",
    skills: ["Active Directory", "Permissions", "User Management"],
    serverRdpFile: "/rdp/1/server.rdp",
    workshopRdpFile: "/rdp/1/workstation.rdp",
    completionKey: "LetMeInNow",

    labScenario: [
      "Your organization uses a shared folder on the server for a specific department.",
      "Access is controlled through an Active Directory security group.",
      "A user reports they cannot access the shared drive.",
      "Your task is to identify the correct security group and add the user."
    ],

    labTasks: [
      "Identify the AD security group assigned to manage access to the shared folder.",
      "Find the user account that needs shared drive access.",
      "Add the user to the appropriate security group.",
      "Have the user refresh their session or log off/on.",
      "Verify they can successfully access the shared folder.",
      "Run the provided batch script and enter the completion code."
    ],

    expectedOutcome: [
      "The user can access the shared directory without permission errors.",
      "You demonstrate proper use of AD security groups to manage access.",
      "You complete the lab and submit your verification code."
    ],

    instructions: [
      "Open Active Directory Users and Computers.",
      "Locate the shared folder's security group.",
      "Find the user account requiring access.",
      "Add the user to the group and apply changes.",
      "Verify access from the user's machine."
    ]
  },
  {
    id: 2,
    name: "VPN Connection Failure",
    difficulty: "Medium",
    skills: ["Networking", "Troubleshooting"],
    serverRdpFile: "/rdp/2/server.rdp",
    workshopRdpFile: "/rdp/2/workstation.rdp",
    completionKey: "VPN444",

    labScenario: [
      "A user cannot connect to the corporate VPN.",
      "They report DNS issues and failed authentication.",
      "Your task is to diagnose and restore VPN connectivity."
    ],

    labTasks: [
      "Verify the workstation has basic network connectivity.",
      "Test DNS resolution for the VPN gateway.",
      "Confirm the user’s credentials are valid and not expired.",
      "Restart the VPN client services.",
      "Attempt reconnection and document results."
    ],

    expectedOutcome: [
      "The VPN client successfully connects.",
      "Network and DNS issues are resolved.",
      "User is able to authenticate without errors."
    ],

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
    serverRdpFile: "/rdp/3/server.rdp",
    workshopRdpFile: "/rdp/3/workstation.rdp",
    completionKey: "MAIL777",

    labScenario: [
      "A user reports that their email is not syncing on Outlook or a mobile device.",
      "The account was recently updated, which may be causing issues.",
      "Your task is to restore proper email synchronization."
    ],

    labTasks: [
      "Check if Outlook/Mail is connected.",
      "Verify mailbox credentials were entered correctly.",
      "Restart the mail app or Outlook.",
      "Remove and re-add the user's account if needed.",
      "Confirm that emails sync normally after your fix."
    ],

    expectedOutcome: [
      "The user's mailbox syncs without errors.",
      "Authentication and connection issues are resolved."
    ],

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
    serverRdpFile: "/rdp/4/server.rdp",
    workshopRdpFile: "/rdp/4/workstation.rdp",
    completionKey: "DISK999",

    labScenario: [
      "A server reports critically low disk space.",
      "Large log files, old temp files, or unused applications may be causing the issue.",
      "Your task is to free enough space for the server to operate normally."
    ],

    labTasks: [
      "Check drive usage and locate the largest files.",
      "Run Disk Cleanup and remove unnecessary items.",
      "Delete oversized temp or log files if appropriate.",
      "Uninstall unused software.",
      "Free at least 2–5 GB of space."
    ],

    expectedOutcome: [
      "Server runs without disk space warnings.",
      "Free space has increased to a safe operating level.",
      "Unnecessary files and applications are cleaned up."
    ],

    instructions: [
      "Open File Explorer and check drive usage.",
      "Run Disk Cleanup to remove system junk.",
      "Check for large log files in temp directories.",
      "Uninstall unnecessary applications.",
      "Free at least 2–5GB of storage space."
    ]
  }
];
