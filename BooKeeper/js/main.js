class Course {
    getScoresHTML() {
        let scoresHTML = "";
        let totalScore = 0;
        for (const categoryScore of this.criterionScores) {
            const { score, criterion } = categoryScore;
            const scoreHTML = `
                <div class="criterion-score">
                    <div class="score">
                        <p>${score}</p>
                    </div>
                    <div class="criterion">
                        ${criterion}
                    </div>
                </div>
            `;
            scoresHTML += scoreHTML;
            totalScore += score;
        }
        const totalScoreHTML = `
            <div class="criterion-score">
                <div class="total-score">
                    <p>${totalScore}</p>
                </div>
                <div class="criterion">
                    Total
                </div>
            </div>
        `;
        scoresHTML += totalScoreHTML;
        return scoresHTML;
    }
}

class Term {
    toHTML() {
        let sectionHeader = `<h2>${this.term}</h2>`;
        let culumnNames = `
            <div class="table-column-names">
                <h4 class="large-cell">Course</h4>
                <h4 class="large-cell">Tutor</h4>
                <h4 class="small-cell remove-on-mobile">Credits</h4>
                <h4 class="small-cell">Score</h4>
                <h4 class="small-cell">Grade</h4>
            </div>
        `;
        let coursesHTML = "";
        for (let course of this.courses) {
            let courseHTML = `
                <a href="#">
                    <div class="course-entry-container" id=${course.id}>
                        <div class="course-entry">
                            <p class="large-cell">${course.name}</p>
                            <p class="large-cell">${course.tutor.name}</p>
                            <p class="small-cell remove-on-mobile">${course.credits}</p>
                            <p class="small-cell">${course.score}</p>
                            <p class="small-cell">${course.grade}</p>
                        </div>
                    </div>
                </a>
            `;
            coursesHTML += courseHTML.trim();
        }

        let html = `
            <div class="term">
                ${sectionHeader.trim()}
                ${culumnNames.trim()}
                ${coursesHTML.trim()}
            </div>
        `;

        return html;
    }
};

class Category {
    toHTML() {
        let sectionHeader = `<h2>${this.category}</h2>`;
        let culumnNames = `
            <div class="table-column-names">
                <h4 class="large-cell">Course</h4>
                <h4 class="large-cell">Tutor</h4>
                <h4 class="small-cell remove-on-mobile">Credits</h4>
                <h4 class="small-cell">Selected</h4>
            </div>
        `;
        let coursesHTML = "";
        for (let course of this.courses) {
            let courseHTML = `
                <a href="#">
                    <div class="course-entry-container" id=${course.id}>
                        <div class="course-entry">
                            <p class="large-cell">${course.name}</p>
                            <p class="large-cell">${course.tutor.name}</p>
                            <p class="small-cell remove-on-mobile">${course.credits}</p>
                            <input type="checkbox" class="small-cell">
                        </div>
                    </div>
                </a>
            `;
            coursesHTML += courseHTML.trim();
        }

        let html = `
            <div class="term">
                ${sectionHeader.trim()}
                ${culumnNames.trim()}
                ${coursesHTML.trim()}
            </div>
        `;

        return html;
    }
}


handleDashboard = () => {
    const mainContainerHTML = `
        <div class="center-container"></div>
        <div class="details-panel">
            <div class="details-container">
                <div class="details-exit">
                    <a href="#">X</a>
                </div>
                <h2>Course Name</h2>
                <h3>Tutor</h3>
                <div class="details-course-description"></div>
                <div class="details-scores"></div>
                <div class="details-chart">
                    <img src="../BooKeeper/assets/Grade Distribution.png" alt="Grade Distribution">
                </div>
            </div>
        </div>
    `;
    document.querySelector(".main-container").innerHTML = mainContainerHTML;
    container = document.querySelector(".center-container");
    container.innerHTML = "";
    terms = fetch("../BooKeeper/data/selectedCourses.json")
        .then(response => response.json())
        .then(terms => {
            for (term of terms) {
                term = Object.assign(new Term(), term);
                let termHTML = term.toHTML();
                container.innerHTML += termHTML;
            }
        });
}

handleCourses = () => {
    mainContainer = document.querySelector(".main-container");
    mainContainerHTML = `
        <div class="filter-container">
            <div class="filter">
                <h2>Filter</h2>
                <div class="field">
                    <label for="category">Category</label>
                    <select name="category">
                        <option value="MACS">MACS</option>
                        <option value="ECON">ECON</option>
                        <option value="PHY">PHY</option>
                    </select>
                </div>
                <div class="field">
                    <label for="credits">Credits</label>
                    <select name="credits">
                        <option value="MACS">MACS</option>
                        <option value="ECON">ECON</option>
                        <option value="PHY">PHY</option>
                    </select>
                </div>
                <div class="field">
                    <label for="category">Tutor</label>
                    <select name="tutor">
                        <option value="MACS">MACS</option>
                        <option value="ECON">ECON</option>
                        <option value="PHY">PHY</option>
                    </select>
                </div>
                <div class="field">
                    <label for="selected">Selected</label>
                    <select name="selected">
                        <option value="Selected">Selected</option>
                        <option value="Not Selected">Not Selected</option>
                    </select>
                </div>
                <button>
                    APPLY
                </button>
            </div>
        </div>
        <div class="center-container"></div>
        <div class="details-panel">
            <div class="details-container">
                <div class="details-exit">
                    <a href="#">X</a>
                </div>
                <h2>Course Name</h2>
                <h3>Tutor</h3>
                <div class="details-course-description"></div>
                <div class="details-scores"></div>
                <div class="details-chart">
                    <img src="../BooKeeper/assets/Grade Distribution.png" alt="Grade Distribution">
                </div>
            </div>
        </div>
    `;
    mainContainer.innerHTML = mainContainerHTML;

    container = document.querySelector(".center-container");
    container.innerHTML = "";
    categories = fetch("../BooKeeper/data/categoryCourses.json")
        .then(response => response.json())
        .then(categories => {
            for (category of categories) {
                category = Object.assign(new Category(), category);
                let categoryHTML = category.toHTML();
                container.innerHTML += categoryHTML;
            }
        });
}

handleProfile = () => {
    // hardcoded demo user page
    const mainContainerHTML = `
        <div class="center-container">
            <div class="info-card">
                <img src="../BooKeeper/assets/DU.png" alt="Grade Distribution">
                <h2>Demo User</h2>
                <h3>Liberal Arts</h3>
                <table class="info-table">
                    <tbody>
                        <tr>
                            <td>Sex:</td>
                            <td>Male</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>random@email.com</td>
                        </tr>
                        <tr>
                            <td>Nationality:</td>
                            <td>Digital</td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>07-12-1979</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>21st Jump Street</td>
                        </tr>
                        <tr>
                            <td>Total Credits:</td>
                            <td>66</td>
                        </tr>
                        <tr>
                            <td>GPA:</td>
                            <td>3.72</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
    document.querySelector(".main-container").innerHTML = mainContainerHTML;

}

var useHash = true;
var hash = '#';
var router = new Navigo(null, useHash, hash);

router.on({
	"/dashboard": () => {
        handleDashboard();
	},
	"/courses": () => {
        handleCourses();
	},
	"/profile": () => {
        handleProfile();
	},
	"/*": () => {
        // handleDashboard();
	}
}).resolve();

document.addEventListener("click", (e) => {
    if (e.target.closest("input")){
        return;
    } if (e.target.closest(".course-entry-container")) {
        const courseContainer = e.target.closest(".course-entry-container");
        const container = document.querySelector(".main-container");
        const centerContainer = document.querySelector(".center-container");
        const courseDetails = document.querySelector(".details-panel");

        // Terrible way of fetching course by ID
        terms = fetch("../BooKeeper/data/selectedCourses.json")
            .then(response => response.json())
            .then(terms => {
                let courseById;
                for (term of terms) {
                    for (course of term.courses) {
                        if (course.id == courseContainer.id) {
                            courseById = course;
                            break;
                        }
                    }
                    if (courseById) {
                        break;
                    }
                }
                courseById = Object.assign(new Course(), courseById);
                courseDetails.querySelector("h2").innerHTML = courseById.name;
                courseDetails.querySelector("h3").innerHTML = courseById.tutor.name;
                courseDetails.querySelector(".details-course-description").innerHTML = courseById.description;
                courseDetails.querySelector(".details-scores").innerHTML = courseById.getScoresHTML();
                courseDetails.querySelector(".details-chart").src = courseById.gradeChart;
            })
            .then(() => {
                container.classList.add("main-container-shrinked");
                centerContainer.classList.add("center-container-shrinked");
                courseDetails.style.display = "block";
            });
    } else if (e.target.closest(".details-exit")) {
        const container = document.querySelector(".main-container");
        const centerContainer = document.querySelector(".center-container");
        const courseDetails = document.querySelector(".details-panel");

        container.classList.remove("main-container-shrinked");
        centerContainer.classList.remove("center-container-shrinked");
        courseDetails.style.display = "none";
    } else if (e.target.id == "login-button") {
        // not the best approach of replacing entire html
        document.querySelector("head").innerHTML = `
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/main.css">
            <title>BooKeeper | Dashboard</title>
        `;
        document.querySelector("body").innerHTML = `
            <div class="background"></div>
            <nav>
                <div class="nav-container">
                    <a href="#" class="logo">
                        BooKeeper
                    </a>
                    <div class="searchbar">
                        <input type="text" placeholder="Search" class="search">
                    </div>
                    <div class="account">
                        <div class="profile-pic">
        
                        </div>
                        <div class="username">
                            Demo User
                        </div>
                    </div>
                </div>
            </nav>
            <div class="sidebar">
                <a href="#/dashboard" class="tab">
                    <div class="tab-icon">
                        <img src="../BooKeeper/assets/dashboard.png">
                    </div>
                    <div class="tab-name">
                        Dashboard
                    </div>
                </a>
                <a href="#/profile" class="tab">
                    <div class="tab-icon">
                        <img src="../BooKeeper/assets/profile.png">
                    </div>
                    <div class="tab-name">
                        Profile
                    </div>
                </a>
                <a href="#/courses" class="tab">
                    <div class="tab-icon">
                        <img src="../BooKeeper/assets/selection.png">
                    </div>
                    <div class="tab-name">
                        Course Selection
                    </div>
                </a>
            </div>
            <div class="main-container">
                <div class="center-container"></div>
                <div class="details-panel">
                    <div class="details-container">
                        <div class="details-exit">
                            <a href="#">X</a>
                        </div>
                        <h2>Course Name</h2>
                        <h3>Tutor</h3>
                        <div class="details-course-description"></div>
                        <div class="details-scores"></div>
                        <div class="details-chart">
                            <img src="../BooKeeper/assets/Grade Distribution.png" alt="Grade Distribution">
                        </div>
                    </div>
                </div>
            </div>
        
            <!-- Script -->
            <script src="https://unpkg.com/navigo@6.0.2/lib/navigo.min.js"></script>
            <script src="js/main.js"></script>
        `;
        router.navigate("/profile");
    }
})