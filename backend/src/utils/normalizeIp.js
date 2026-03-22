/**
 * Normalize an IP address so that IPv6-mapped IPv4 addresses
 * (e.g. "::ffff:192.168.1.1") are stored as plain IPv4 ("192.168.1.1").
 * This ensures the same physical device is always recorded with the same IP,
 * preventing one visitor from being counted as multiple unique users.
 */
export const normalizeIp = (ip) => {
    if (!ip) return 'unknown';

    // Strip IPv6-mapped IPv4 prefix  ::ffff:x.x.x.x  →  x.x.x.x
    if (ip.startsWith('::ffff:')) {
        return ip.slice(7);
    }

    // When behind a proxy, X-Forwarded-For may be comma-separated: "1.2.3.4, 10.0.0.1"
    // Express with trust proxy gives us the leftmost (client) IP, but just in case:
    if (ip.includes(',')) {
        return ip.split(',')[0].trim();
    }

    return ip;
};
