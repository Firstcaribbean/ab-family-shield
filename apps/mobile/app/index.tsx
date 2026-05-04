import { dashboardSnapshot } from "@family-safety/shared";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const child = dashboardSnapshot.children[0];
const report = dashboardSnapshot.weeklyReports[0];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Family Safety</Text>
          <Text style={styles.title}>One place for location, alerts, rules, and SOS.</Text>
          <Text style={styles.subtitle}>
            A fast mobile foundation for both parent monitoring and child safety flows.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Child Status</Text>
          <Text style={styles.metric}>{child.status.isOnline ? "Online" : "Offline"}</Text>
          <Text style={styles.muted}>{child.name} is protected and connected.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Battery</Text>
          <Text style={styles.metric}>{child.status.batteryLevel}%</Text>
          <Text style={styles.muted}>Device health stays visible at a glance.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Safety Score</Text>
          <Text style={styles.metric}>{report.safetyScore}</Text>
          <Text style={styles.muted}>Weekly report summary with alerts and activity.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Safe Zones</Text>
          {child.safeZones.map((zone) => (
            <View key={zone.id} style={styles.row}>
              <Text style={styles.rowTitle}>{zone.name}</Text>
              <Text style={styles.rowMeta}>{zone.status}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Recent Alerts</Text>
          {dashboardSnapshot.alerts.slice(0, 3).map((alert) => (
            <View key={alert.id} style={styles.row}>
              <Text style={styles.rowTitle}>{alert.type.replace("_", " ")}</Text>
              <Text style={styles.rowMeta}>{alert.severity}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.card, styles.alertCard]}>
          <Text style={styles.label}>Emergency</Text>
          <Text style={styles.metric}>SOS Ready</Text>
          <Text style={styles.muted}>
            This module is the starting point for panic-button events and instant location share.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5efe5"
  },
  container: {
    padding: 20,
    gap: 16
  },
  hero: {
    backgroundColor: "#fffaf3",
    borderRadius: 28,
    padding: 24,
    gap: 12
  },
  eyebrow: {
    color: "#0f8b8d",
    letterSpacing: 2,
    textTransform: "uppercase",
    fontSize: 12
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    color: "#1d2a33",
    fontWeight: "700"
  },
  subtitle: {
    color: "#58636f",
    fontSize: 16,
    lineHeight: 24
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    gap: 8
  },
  alertCard: {
    backgroundColor: "#fff6e8"
  },
  label: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    color: "#58636f"
  },
  metric: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d2a33"
  },
  muted: {
    fontSize: 15,
    color: "#58636f",
    lineHeight: 22
  },
  row: {
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ece5d9",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  rowTitle: {
    color: "#1d2a33",
    fontSize: 15,
    fontWeight: "600"
  },
  rowMeta: {
    color: "#58636f",
    fontSize: 14,
    textTransform: "capitalize"
  }
});
