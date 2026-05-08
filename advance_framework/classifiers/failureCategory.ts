export function categorizeFailure(error: string): string {

    const message = error.toLowerCase();

    if (message.includes('locator')) {
        return 'Locator Issue';
    }

    if (message.includes('timeout')) {
        return 'Timeout';
    }

    if (message.includes('tohaveurl')) {
        return 'Assertion Failure';
    }

    if (message.includes('network')) {
        return 'Network Failure';
    }

    if (message.includes('500')) {
        return 'API Failure';
    }

    return 'Unknown Failure';
}