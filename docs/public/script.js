shuffle(projectsData)

let body = document.body
let projectsDisplay = document.createElement('div')
let navbar = document.createElement('nav')
let navProjButton = document.createElement('a')
let navAboutButton = document.createElement('a')
let turtle = document.createElement('div')
let hr = document.createElement('hr')
let title = document.getElementById('title')

let buildProjectsDisplay = (pd) => {
  pd.setAttribute('id', 'project-display')
}
let buildNavbar = (nav) => {
  navProjButton.setAttribute('href', '/projects')
  navProjButton.setAttribute('tabindex', 2)
  navProjButton.setAttribute('id', 'about-btn')
  navProjButton.setAttribute('class', 'active')
  navProjButton.textContent = 'PROJECTS'
  nav.appendChild(navProjButton)

  navAboutButton.setAttribute('href', '/')
  navAboutButton.setAttribute('tabindex', 1)
  navAboutButton.setAttribute('id', 'projects-btn')
  navAboutButton.textContent = 'ABOUT'
  nav.appendChild(navAboutButton)

  let icon = document.createElement('i')
  icon.setAttribute('class', 'fa fa-caret-down')

  let dropDown = document.createElement('a')
  dropDown.setAttribute('href', 'javascript:void(0)')
  dropDown.setAttribute('class', 'icon')
  dropDown.setAttribute('onclick', 'showPages()')
  dropDown.appendChild(icon)
  nav.appendChild(dropDown)
}
let buildTurtle = (turtle) => {
  turtle.setAttribute('id', 'turtle')
}

buildProjectsDisplay(projectsDisplay)
buildNavbar(navbar)
buildTurtle(turtle)

if (window.location.pathname === '/projects') {
  title.textContent = 'Projects | Marvin Alegre'
  body.appendChild(navbar)
  body.appendChild(projectsDisplay)

  let tagsCount = {}
  for (let project of projectsData) {
    for (let tag of project.tags) {
      if (tagsCount[tag]) {
        tagsCount[tag]++
      } else {
        tagsCount[tag] = 1
      }
    }
  }

  let tagsCountSorted = []
  for (let tag in tagsCount) {
    let pair = []
    pair.push(tag)
    pair.push(tagsCount[tag])
    tagsCountSorted.push(pair)
  }
  tagsCountSorted.sort((a, b) => b[1] - a[1])

  // build filters
  let filterButtons = document.createElement('div')
  filterButtons.setAttribute('class', 'filters')
  for (let tag of tagsCountSorted) {
    let filter = document.createElement('button')
    filter.setAttribute('id', tag[0])
    filter.setAttribute('class', 'filter')
    filter.textContent = tag[0] + ' ' + tag[1]
    
    filterButtons.appendChild(filter)
  }
  projectsDisplay.appendChild(filterButtons)
  
  // build initial project list
  let projects = document.createElement('div')
  projects.setAttribute('id', 'projects')
  for (let project of projectsData) {
    let projectCard = document.createElement('div')
    projectCard.setAttribute('class', 'project')

    let name = document.createElement('h3')
    name.textContent = project.projectName
    projectCard.appendChild(name)

    let description = document.createElement('p')
    description.textContent = project.description
    projectCard.appendChild(description)

    let repo = document.createElement('a')
    let githubIcon = document.createElement('i')
    githubIcon.setAttribute('class', 'fa fa-brand fa-github')
    repo.appendChild(githubIcon)
    repo.setAttribute('href', project.repo)
    repo.setAttribute('class', 'project-link')
    projectCard.appendChild(repo)

    let url = document.createElement('a')
    let urlIcon = document.createElement('i')
    urlIcon.setAttribute('class', 'fa-solid fa-link')
    url.appendChild(urlIcon)
    url.setAttribute('href', project.url)
    url.setAttribute('class', 'project-link')
    projectCard.appendChild(url)

    let ul = document.createElement('ul')
    ul.setAttribute('class', 'tags')
    for (let tag of project.tags) {
      let li = document.createElement('li')
      let a = document.createElement('a')
      a.textContent = tag
      a.setAttribute('href', techLinks[tag])
      li.appendChild(a)
      ul.appendChild(li)
    }
    projectCard.appendChild(ul)

    projects.appendChild(projectCard)
  }
  projectsDisplay.appendChild(projects)

  let filters = []
  let buttons = document.getElementsByClassName('filter')
  for (let button of buttons) {
    button.addEventListener('click', (e) => {
      if (!filters.includes(button.getAttribute('id'))) {
        button.setAttribute('style', 'background-color: yellow;')
        filters.push(button.getAttribute('id'))
      } else {
        button.setAttribute('style', 'background-color: #e9e9ed;')
        let count = 0
        for (let tag of filters) {
          if (tag === e.target.getAttribute('id')) {
            filters.splice(count, 1)
            break
          }
          count++
        }
      }

      let projects = document.getElementsByClassName('project')
      for (let project of projects) {
        let tags
        for (let node of project.childNodes) {
          if (node.className === 'tags') {
            tags = node
          }
        }

        let count = 0
        for (let filter of filters) {
          for (let li of tags.childNodes) {
            if (li.textContent === filter) {
              count++
            }
          }
        }

        if (count === filters.length) {
          project.style.display = ''
        } else {
          project.style.display = 'none'
        }
      }
    })
  }

  projectsDisplay.appendChild(hr)
  projectsDisplay.appendChild(turtle)

} else {
  let main = document.createElement('main')
  let error = document.createElement('p')
  error.textContent = 'Not Found'
  main.appendChild(error)

  title.textContent = '404 | Marvin Alegre'
  body.appendChild(navbar)
  body.appendChild(projectsDisplay)
  projectsDisplay.appendChild(main)
  projectsDisplay.appendChild(hr)
  projectsDisplay.appendChild(turtle)

  document.getElementById('about-btn').style.backgroundColor = '#333'
}

function showPages() {
  var x = document.getElementsByTagName("nav")[0];
  if (x.className === "") {
    x.className += "responsive";
  } else {
    x.className = "";
  }
}

// copied this function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}