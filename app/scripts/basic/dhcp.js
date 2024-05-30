class DHCPServer {
  constructor(ipRangeStart, ipRangeEnd) {
    this.ipRangeStart = ipRangeStart;
    this.ipRangeEnd = ipRangeEnd;
    this.assignedIPs = new Set();
  }

  allocateIP() {
    for (let i = this.ipRangeStart; i <= this.ipRangeEnd; i++) {
      const ip = `192.168.0.${i}`;
      if (!this.assignedIPs.has(ip)) {
        this.assignedIPs.add(ip);
        return ip;
      }
    }
    throw new Error("No available IP addresses");
  }

  releaseIP(ip) {
    this.assignedIPs.delete(ip);
  }
}

export default DHCPServer;
