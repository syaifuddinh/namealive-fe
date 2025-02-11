export function objectToUrlParams(obj: Record<string, any>): string {
    return Object.entries(obj)
        .map(([key, value]) => 
        encodeURIComponent(key) + '=' + encodeURIComponent(value)
        )
        .join('&');
}