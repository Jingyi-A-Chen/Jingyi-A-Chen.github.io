import { about, advisors, education, honors, profile, publications } from './content.js';

const $ = (selector) => document.querySelector(selector);

function link({ label, name, url }) {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = label || name;
    anchor.rel = 'noreferrer';
    return anchor;
}

function renderProfile() {
    document.title = profile.name;
    $('#profile-photo').src = profile.photo;
    $('#profile-photo').alt = `${profile.name} profile photo`;
    $('#name').textContent = profile.name;
    $('#native-name').textContent = profile.nativeName || '';
    $('#role').textContent = profile.role;
    $('#affiliation').textContent = profile.affiliation;
    $('#location').textContent = profile.location;
    $('#email').href = `mailto:${profile.email}`;
    $('#email').textContent = profile.email;

    const links = $('#profile-links');
    profile.links.forEach((item) => links.append(link(item)));

    const interests = $('#interests');
    profile.interests.forEach((item) => {
        const chip = document.createElement('span');
        chip.textContent = item;
        interests.append(chip);
    });
}

function renderAbout() {
    const container = $('#about-text');
    about.forEach((text) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        container.append(paragraph);
    });

    const advisorList = $('#advisors');
    advisors.forEach((advisor, index) => {
        advisorList.append(link(advisor));
        if (index < advisors.length - 1) advisorList.append(', ');
    });
}

function renderEducation() {
    const list = $('#education-list');
    education.forEach((item) => {
        const row = document.createElement('li');
        row.innerHTML = `<span>${item.period}</span><strong>${item.degree}</strong>`;
        const school = link({ label: item.institution, url: item.url });
        row.append(school);
        list.append(row);
    });
}

function renderPublications() {
    const list = $('#publication-list');
    publications.forEach((item) => {
        const row = document.createElement('li');

        const title = document.createElement('strong');
        title.className = 'publication-title';
        title.textContent = item.title;
        row.append(title);

        const authors = document.createElement('span');
        authors.textContent = item.authors;
        row.append(authors);

        const venue = document.createElement('span');
        venue.className = 'publication-venue';
        venue.append(link({ label: item.venue, url: item.url }));
        venue.append(` · ${item.year}`);
        row.append(venue);
        list.append(row);
    });
}

function renderHonors() {
    const list = $('#honors-list');
    honors.forEach((item) => {
        const row = document.createElement('li');
        row.textContent = item;
        list.append(row);
    });
}

renderProfile();
renderAbout();
renderEducation();
renderPublications();
renderHonors();
