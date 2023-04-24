function getAbout() {
    return (
        {
            "about": {
                "longDescription1": "My name is Joao, I'm a Self-taught Software Developer who specializes in web development. The number one quality I like to tell everyone that comes across my profile is that I'm passionate about learning. Learning for me has never been just about working, but all that I do and appreaciate in life.",
                "longDescription2": "Over these past few years I've put all my effort into collecting knowledge and improving my skills towards creating highly functional cool-looking websites.",
                "personalInfo": {
                    "colOne": {
                        "Name": "Joao Barrera",
                        "Phone Number": "+1 (818) 488-0996",
                        "Last Role": "Junior Web Developer"
                    },
                    "colTwo": {
                        "Age": getAge(),
                        "Location": "Winter Garden, FL",
                        "Email": "joao.victor.lotfi@gmail.com"
                    }
                }
            }
        }
    )
}

const bdayMili = 1035424800000
function getAge() {
    const today = new Date();
    const birthDate = new Date(bdayMili);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

module.exports = getAbout
