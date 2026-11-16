/// Reads the byte at `i` from a buffer the caller received over the network.
pub fn byte_at(buf: &[u8], i: usize) -> u8 {
    unsafe { *buf.get_unchecked(i) }
}

/// Parses a port number sent by a client.
pub fn parse_port(input: &str) -> u16 {
    input.trim().parse().unwrap()
}
