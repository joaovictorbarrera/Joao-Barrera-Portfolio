document.querySelector(".change-theme-btn").addEventListener("click", toggleTheme)

function toggleTheme() {
    const lightColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-theme-color')
    const lightColorInverse = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-theme-inverse-color')
    const lightHeaderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--light-theme-header-color')

    const darkColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--dark-theme-color')
    const darkColorInverse = getComputedStyle(document.documentElement)
    .getPropertyValue('--dark-theme-inverse-color')
    const darkHeaderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--dark-theme-header-color')

    console.log(getComputedStyle(document.documentElement)
    .getPropertyValue('--theme'))
    if(getComputedStyle(document.documentElement)
    .getPropertyValue('--theme') === "light") {
        changeTheme("dark", darkColor, darkColorInverse, darkHeaderColor, "🔆")
    } else {
        changeTheme("light", lightColor, lightColorInverse, lightHeaderColor, "🌙")
    }
}

function changeTheme(theme, color, inverse_color, header_color, icon) {
    document.documentElement.style
    .setProperty('--theme', theme);
    document.documentElement.style
    .setProperty('--theme-color', color);
    document.documentElement.style
    .setProperty('--theme-inverse-color', inverse_color);
    document.documentElement.style
    .setProperty('--theme-header-color', header_color);
    document.querySelector(".change-theme-btn").innerText = icon
}
