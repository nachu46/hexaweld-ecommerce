const supabase = require('../config/supabase');

/**
 * Supabase Keep-Alive Anti-Pause Heartbeat Service
 * Prevents Supabase free tier from entering 7-day auto-pause mode.
 */
const startSupabaseHeartbeat = () => {
    const pingSupabase = async () => {
        try {
            // Ping categories or health table via Supabase JS client
            const { error } = await supabase
                .from('categories')
                .select('id')
                .limit(1);

            if (error && error.code !== 'PGRST116') {
                console.log(`📡 Supabase Anti-Pause Ping Status: Active REST query executed (${error.message || 'OK'})`);
            } else {
                console.log('⚡ Supabase Anti-Pause Heartbeat: Database is ACTIVE & Awake!');
            }
        } catch (err) {
            console.warn('Supabase Ping Notice:', err.message);
        }
    };

    // Initial ping on server startup
    pingSupabase();

    // Schedule recurring heartbeat every 6 hours (21,600,000 ms)
    const HEARTBEAT_INTERVAL = 6 * 60 * 60 * 1000;
    setInterval(pingSupabase, HEARTBEAT_INTERVAL);
    console.log('⏰ Supabase Anti-Pause Heartbeat timer initialized (Pings every 6 hours).');
};

module.exports = startSupabaseHeartbeat;
