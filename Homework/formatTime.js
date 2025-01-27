const timeInstances = [
    {Name: "Week", TimesBiggerThanLower: 7},
    {Name: "Day", TimesBiggerThanLower: 24},
    {Name: "Hour", TimesBiggerThanLower: 60, DesiredLength: 2},
    {Name: "Minute", TimesBiggerThanLower: 60, DesiredLength: 2},
    {Name: "Second", TimesBiggerThanLower: 1, DesiredLength: 2},
]

timeInstances.forEach(({TimesBiggerThanLower}, index) => {
    let secondsPerOne = TimesBiggerThanLower
    for (let i = index + 1; i < timeInstances.length; i++) {
        secondsPerOne *= timeInstances[i].TimesBiggerThanLower
    }
    timeInstances[index]["SecondsPerOne"] = secondsPerOne
})

export const convertSeconds = (totalSeconds) => {
    // const weeks = Math.floor(totalSeconds / 604800)
    // const days = Math.floor(totalSeconds / 86400) - weeks * 7
    // const hours = Math.floor(totalSeconds / 3600) - days * 24
    // const minutes = Math.floor(totalSeconds / 60) - hours * 60
    // const seconds = totalSeconds - minutes * 60

    let output = ""
    timeInstances.forEach((info) => {
        const {Name, SecondsPerOne} = info
        let x = Math.floor(totalSeconds / SecondsPerOne)
        totalSeconds -= x * SecondsPerOne

        const sEnding = x % 100 !== 1 || x === 0 ? "s" : ""
        if ("DesiredLength" in info) {
            x = `${x}`.padStart(info.DesiredLength, "_")
        }

        output += " ~ "
        output += `${x} ${Name}${sEnding}`
    })

    return output
}