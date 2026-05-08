export function shouldRetry(error: string): boolean {

    const message = error.toLowerCase();

    // SAFE RETRIES
    if (message.includes('timeout')) {
        return true;
    }

    if (message.includes('network')) {
        return true;
    }

    if (message.includes('detached')) {
        return true;
    }

    // DO NOT RETRY ASSERTIONS
    if (message.includes('tohaveurl')) {
        return false;
    }

    // DO NOT RETRY BUSINESS FAILURES
    if (message.includes('expect')) {
        return false;
    }

    return false;
}