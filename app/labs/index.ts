export type Problem = {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  premium: boolean;
  skills: string[];
  serverRdpFile: string;
  workshopRdpFile: string;
  instructions: string[];
  completionKey: string;
  image: string;
  labScenario: string[];
  labTasks: string[];
  expectedOutcome: string[];
};
export const problems: Problem[] = [
  // -------------------------------------------------
  // 🟢 EASY (3)
  // -------------------------------------------------
  {
    id: 1,
    name: "Shared Folder Access – AD Group Permissions",
    difficulty: "Easy",
    premium: false,
    skills: ["Active Directory", "Permissions", "User Management"],
    serverRdpFile: "/rdp/1/server.rdp",
    workshopRdpFile: "/rdp/1/workstation.rdp",
    completionKey: "LetMeInNow",
    image: "lab1.webp",
    labScenario: [
      "A user cannot access a department shared folder.",
      "The folder is controlled using an AD security group.",
      "You must add the user to the correct group.",
    ],

    labTasks: [
      "Identify the security group tied to the shared folder.",
      "Locate the user in ADUC.",
      "Add the user to the correct AD group.",
      "Have the user refresh their session.",
      "Verify folder access.",
    ],

    expectedOutcome: [
      "User gains proper shared folder access.",
      "AD group membership updated successfully.",
    ],

    instructions: [
      "Open ADUC.",
      "Navigate to the correct group.",
      "Add the user.",
      "Test access.",
    ],
  },

  {
    id: 2,
    name: "Printer Not Showing on Workstation",
    difficulty: "Easy",
    premium: false,
    skills: ["Printer Management", "Networking", "User Support"],
    serverRdpFile: "/rdp/2/server.rdp",
    workshopRdpFile: "/rdp/2/workstation.rdp",
    completionKey: "PRINT123",
    image: "lab2.webp",
    labScenario: [
      "A user cannot see their assigned network printer.",
      "The printer is deployed via the print server.",
      "You must restore the mapping.",
    ],

    labTasks: [
      "Ping the print server.",
      "Check printer status.",
      "Re-add the printer to the workstation.",
      "Print a test page.",
    ],

    expectedOutcome: ["Printer appears and prints successfully."],

    instructions: [
      "Open Print Management.",
      "Verify printer online.",
      "Re-add the printer.",
      "Test print.",
    ],
  },

  {
    id: 3,
    name: "Premium: Login Script Not Mapping Drives",
    difficulty: "Easy",
    premium: true,
    skills: ["Login Scripts", "GPO", "File Services"],
    serverRdpFile: "/rdp/3/server.rdp",
    workshopRdpFile: "/rdp/3/workstation.rdp",
    completionKey: "MAPME222",
    image: "lab3.webp",
    labScenario: [
      "A user's network drives do not map after login.",
      "The organization uses login scripts via GPO.",
      "You must resolve the mapping failure.",
    ],

    labTasks: [
      "Check whether the login script executed.",
      "Verify DNS resolution for the file server.",
      "Check share permissions for the script.",
      "Manually run the script.",
      "Fix missing drive mappings.",
    ],

    expectedOutcome: ["Drive mappings work automatically on login."],

    instructions: [
      "Run gpresult.",
      "Verify script path.",
      "Test manual execution.",
      "Fix drive mappings.",
    ],
  },

  // -------------------------------------------------
  // 🟡 MEDIUM (3)
  // -------------------------------------------------
  {
    id: 4,
    name: "VPN Connection Failure",
    difficulty: "Medium",
    premium: false,
    skills: ["Networking", "VPN", "Troubleshooting"],
    serverRdpFile: "/rdp/4/server.rdp",
    workshopRdpFile: "/rdp/4/workstation.rdp",
    completionKey: "VPN444",
    image: "lab4.webp",
    labScenario: [
      "A user cannot connect to the VPN.",
      "DNS and authentication errors appear during connection.",
    ],

    labTasks: [
      "Check workstation network connectivity.",
      "Verify DNS resolution for VPN gateway.",
      "Validate credentials.",
      "Restart VPN service.",
      "Test reconnection.",
    ],

    expectedOutcome: ["VPN connects successfully and authentication works."],

    instructions: [
      "Use ipconfig and ping.",
      "Check DNS.",
      "Restart VPN client.",
    ],
  },

  {
    id: 5,
    name: "Email Not Syncing on Outlook",
    difficulty: "Medium",
    premium: false,
    skills: ["Exchange", "Outlook", "Mobile Support"],
    serverRdpFile: "/rdp/5/server.rdp",
    workshopRdpFile: "/rdp/5/workstation.rdp",
    completionKey: "MAIL777",
    image: "lab5.webp",
    labScenario: [
      "User reports Outlook not syncing.",
      "Mailbox credentials or profile may be corrupted.",
    ],

    labTasks: [
      "Check Outlook connection status.",
      "Verify credentials.",
      "Restart Outlook.",
      "Repair or recreate mail profile.",
    ],

    expectedOutcome: ["Mailbox sync fully restored."],

    instructions: [
      "Go to Account Settings.",
      "Repair profile.",
      "Confirm sync.",
    ],
  },

  {
    id: 6,
    name: "Premium: Multi-Site Login Failure – Replication Issue",
    difficulty: "Medium",
    premium: true,
    skills: ["Active Directory", "Replication", "FSMO Roles"],
    serverRdpFile: "/rdp/6/server.rdp",
    workshopRdpFile: "/rdp/6/workstation.rdp",
    completionKey: "FSMO444",
    image: "lab6.webp",
    labScenario: [
      "Users in a remote office cannot authenticate.",
      "Replication or FSMO failure is suspected.",
    ],

    labTasks: [
      "Check replication with repadmin.",
      "Verify DC availability.",
      "Check FSMO role owners.",
      "Force AD replication.",
      "Test authentication again.",
    ],

    expectedOutcome: ["Remote site authentication restored."],

    instructions: [
      "Run repadmin.",
      "Verify DCs.",
      "Review FSMO roles.",
      "Trigger replication.",
    ],
  },

  // -------------------------------------------------
  // 🔴 HARD (3)
  // -------------------------------------------------
  {
    id: 7,
    name: "Disk Space Critical – Server Cleanup",
    difficulty: "Hard",
    premium: false,
    skills: ["OS", "Diagnostics", "System Cleanup"],
    serverRdpFile: "/rdp/7/server.rdp",
    workshopRdpFile: "/rdp/7/workstation.rdp",
    completionKey: "DISK999",
    image: "lab7.webp",
    labScenario: [
      "Server is critically low on disk space.",
      "Large logs and old temp files may be the cause.",
    ],

    labTasks: [
      "Identify largest files.",
      "Run Disk Cleanup.",
      "Delete unnecessary logs.",
      "Uninstall unused applications.",
    ],

    expectedOutcome: ["Free space restored to safe operating levels."],

    instructions: [
      "Use File Explorer or PowerShell.",
      "Run cleanup tools.",
      "Purge logs.",
    ],
  },

  {
    id: 8,
    name: "GPO Not Applying – Policy Troubleshooting",
    difficulty: "Hard",
    premium: false,
    skills: ["GPO", "Windows Administration"],
    serverRdpFile: "/rdp/8/server.rdp",
    workshopRdpFile: "/rdp/8/workstation.rdp",
    completionKey: "GPO888",
    image:"",
    labScenario: [
      "A workstation is missing mapped drives and restrictions.",
      "GPO inheritance or filtering might be broken.",
    ],

    labTasks: [
      "Run gpresult to see applied policies.",
      "Check OU structure.",
      "Confirm correct GPO filtering.",
      "Run gpupdate.",
    ],

    expectedOutcome: ["GPO applies correctly across the workstation."],

    instructions: [
      "Review gpresult.",
      "Fix GPO scope.",
      "Force policy update.",
    ],
  },

  {
    id: 9,
    name: "Premium: Kerberos Authentication Failure – Ticket Debugging",
    difficulty: "Hard",
    premium: true,
    skills: ["Kerberos", "Domain Services", "Advanced Authentication"],
    serverRdpFile: "/rdp/9/server.rdp",
    workshopRdpFile: "/rdp/9/workstation.rdp",
    completionKey: "KRBOS777",
    image:"",
    labScenario: [
      "Users cannot access services requiring Kerberos.",
      "Event Viewer logs show KRB5 and ticket errors.",
    ],

    labTasks: [
      "Verify time sync between servers and clients.",
      "Check SPNs for duplicates or missing entries.",
      "Review Kerberos logs.",
      "Reset tickets using klist.",
      "Correct SPN misconfigurations.",
    ],

    expectedOutcome: ["Kerberos authentication restored across all services."],

    instructions: [
      "Check time skew.",
      "Review SPNs.",
      "Clear tickets with klist.",
      "Fix SPN configuration.",
    ],
  },
];
