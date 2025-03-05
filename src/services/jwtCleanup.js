

export function cleanupUsers() {
    const currentTime = Date.now()
    const sevenDays = 7 * 24 * 60 * 60 * 1000

    for (const mainKey in DS) {
        const lastActive = DS[mainKey].lastActive
        if (currentTime - lastActive > sevenDays) {
            delete DS[mainKey]  // Remove inactive user from memory
        }
    }
}