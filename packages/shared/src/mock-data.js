const parent = {
    id: "parent_1",
    name: "Jordan Rivera",
    email: "jordan@example.com",
    phone: "+1 310 555 0148",
    role: "parent",
    createdAt: new Date("2026-05-01T08:00:00.000Z").toISOString()
};
const linkedParents = [
    {
        id: "guardian_2",
        name: "Elena Rivera",
        email: "elena@example.com",
        relationship: "Co-parent"
    }
];
const children = [
    {
        id: "child_1",
        parentId: parent.id,
        name: "Ava",
        age: 12,
        grade: "7th Grade",
        avatarLabel: "AR",
        deviceId: "ios-ava-01",
        status: {
            batteryLevel: 84,
            isOnline: true,
            network: "wifi",
            osName: "iOS",
            osVersion: "18.2",
            appVersion: "1.0.0",
            lowPowerMode: false
        },
        lastSeenAt: new Date("2026-05-02T08:10:00.000Z").toISOString(),
        safeZones: [
            {
                id: "zone_home",
                name: "Home",
                latitude: 34.0522,
                longitude: -118.2437,
                radiusMeters: 120,
                status: "inside"
            },
            {
                id: "zone_school",
                name: "School",
                latitude: 34.0602,
                longitude: -118.2501,
                radiusMeters: 180,
                status: "inside"
            }
        ]
    },
    {
        id: "child_2",
        parentId: parent.id,
        name: "Noah",
        age: 9,
        grade: "4th Grade",
        avatarLabel: "NR",
        deviceId: "android-noah-01",
        status: {
            batteryLevel: 47,
            isOnline: true,
            network: "cellular",
            osName: "Android",
            osVersion: "15",
            appVersion: "1.0.0",
            lowPowerMode: true
        },
        lastSeenAt: new Date("2026-05-02T08:06:00.000Z").toISOString(),
        safeZones: [
            {
                id: "zone_home_noah",
                name: "Home",
                latitude: 34.0522,
                longitude: -118.2437,
                radiusMeters: 120,
                status: "approaching"
            },
            {
                id: "zone_school_noah",
                name: "School",
                latitude: 34.0624,
                longitude: -118.259,
                radiusMeters: 200,
                status: "outside"
            }
        ]
    }
];
const latestLocations = {
    child_1: {
        id: "loc_1",
        childId: "child_1",
        latitude: 34.0602,
        longitude: -118.2501,
        speedMph: 0,
        accuracyMeters: 12,
        recordedAt: new Date("2026-05-02T08:10:00.000Z").toISOString(),
        placeLabel: "School Campus"
    },
    child_2: {
        id: "loc_2",
        childId: "child_2",
        latitude: 34.0569,
        longitude: -118.2474,
        speedMph: 18,
        accuracyMeters: 22,
        recordedAt: new Date("2026-05-02T08:06:00.000Z").toISOString(),
        placeLabel: "Bus Route"
    }
};
const locationHistory = {
    child_1: [
        {
            id: "loc_1a",
            childId: "child_1",
            latitude: 34.0558,
            longitude: -118.2458,
            speedMph: 12,
            accuracyMeters: 18,
            recordedAt: new Date("2026-05-02T07:48:00.000Z").toISOString(),
            placeLabel: "Main Street"
        },
        latestLocations.child_1
    ],
    child_2: [
        {
            id: "loc_2a",
            childId: "child_2",
            latitude: 34.0501,
            longitude: -118.2401,
            speedMph: 0,
            accuracyMeters: 15,
            recordedAt: new Date("2026-05-02T07:40:00.000Z").toISOString(),
            placeLabel: "Home"
        },
        latestLocations.child_2
    ]
};
const alerts = [
    {
        id: "alert_1",
        childId: "child_1",
        type: "arrival",
        message: "Ava arrived at School.",
        createdAt: new Date("2026-05-02T08:05:00.000Z").toISOString(),
        severity: "low",
        acknowledged: true
    },
    {
        id: "alert_2",
        childId: "child_2",
        type: "screen_time",
        message: "Noah is 15 minutes away from today's screen time limit.",
        createdAt: new Date("2026-05-02T08:03:00.000Z").toISOString(),
        severity: "medium",
        acknowledged: false
    },
    {
        id: "alert_3",
        childId: "child_2",
        type: "unsafe_activity",
        message: "A blocked scam site was attempted from Noah's device.",
        createdAt: new Date("2026-05-02T07:58:00.000Z").toISOString(),
        severity: "high",
        acknowledged: false
    }
];
const screenTimeRules = [
    {
        id: "rule_1",
        childId: "child_1",
        name: "Study Mode",
        schedule: "Weekdays 4:00 PM - 6:00 PM",
        dailyLimitMinutes: 120,
        allowedApps: ["Khan Academy", "Safari"],
        blockedApps: ["TikTok", "YouTube"],
        enabled: true
    },
    {
        id: "rule_2",
        childId: "child_2",
        name: "Sleep Mode",
        schedule: "Daily 9:00 PM - 7:00 AM",
        dailyLimitMinutes: 90,
        allowedApps: ["Phone", "Messages"],
        blockedApps: ["Roblox", "YouTube"],
        enabled: true
    }
];
const browsingRules = [
    {
        id: "browse_rule_1",
        childId: "child_1",
        blockedDomains: ["example-malware.com", "unsafe-chat.biz"],
        blockedCategories: ["adult", "malware", "scam"],
        safeSearchEnabled: true
    },
    {
        id: "browse_rule_2",
        childId: "child_2",
        blockedDomains: ["freeprize-now.co"],
        blockedCategories: ["adult", "malware", "scam", "social"],
        safeSearchEnabled: true
    }
];
const browsingLogs = [
    {
        id: "blog_1",
        childId: "child_2",
        domain: "freeprize-now.co",
        category: "scam",
        blocked: true,
        recordedAt: new Date("2026-05-02T07:57:00.000Z").toISOString()
    },
    {
        id: "blog_2",
        childId: "child_1",
        domain: "khanacademy.org",
        category: "education",
        blocked: false,
        recordedAt: new Date("2026-05-02T07:40:00.000Z").toISOString()
    }
];
const weeklyReports = [
    {
        childId: "child_1",
        safetyScore: 94,
        totalScreenTimeMinutes: 640,
        blockedSitesCount: 12,
        alertsCount: 4,
        topRiskCategory: "social",
        summary: "Ava stayed within key routines and had no high-severity incidents."
    },
    {
        childId: "child_2",
        safetyScore: 81,
        totalScreenTimeMinutes: 710,
        blockedSitesCount: 18,
        alertsCount: 7,
        topRiskCategory: "scam",
        summary: "Noah needs closer browsing monitoring and a tighter weekend screen cap."
    }
];
const metrics = [
    {
        id: "metric_1",
        label: "Children Protected",
        value: "2",
        trend: "+1 linked this month"
    },
    {
        id: "metric_2",
        label: "Alerts This Week",
        value: "11",
        trend: "-2 from last week"
    },
    {
        id: "metric_3",
        label: "Blocked Threats",
        value: "30",
        trend: "+6 scam domains blocked"
    },
    {
        id: "metric_4",
        label: "Average Safety Score",
        value: "88",
        trend: "+4 improvement"
    }
];
const settings = {
    notificationsEnabled: true,
    weeklyReportsEnabled: true,
    locationHistoryDays: 30,
    privacyMode: "balanced",
    emergencyContacts: linkedParents
};
export const dashboardSnapshot = {
    parent,
    linkedParents,
    children,
    alerts,
    latestLocations,
    locationHistory,
    screenTimeRules,
    browsingRules,
    browsingLogs,
    weeklyReports,
    metrics,
    settings
};
export const deviceLinkInvites = [
    {
        childId: "child_1",
        code: "AVA-2048",
        expiresAt: new Date("2026-05-03T03:00:00.000Z").toISOString()
    },
    {
        childId: "child_2",
        code: "NOAH-7751",
        expiresAt: new Date("2026-05-03T03:00:00.000Z").toISOString()
    }
];
export const sosEvents = [
    {
        id: "sos_1",
        childId: "child_2",
        message: "Pickup location changed. Requesting parent check-in.",
        createdAt: new Date("2026-05-01T16:12:00.000Z").toISOString(),
        status: "resolved"
    }
];
export const initialAppState = {
    dashboardSnapshot,
    deviceLinkInvites,
    sosEvents,
    auth: {
        parentPassword: "parent123"
    }
};
