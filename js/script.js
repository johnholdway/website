/* ==========================================
   JOHN HOLDWAY ART LAB
   style.css
   ========================================== */

/* ---------- Reset ---------- */

* {
    box-sizing: border-box;
}

html {
    font-size: 16px;
}

body {
    margin: 0;
    padding: 0;

    background-color: #111111;
    color: #ffffff;

    font-family: monospace;
    line-height: 1.6;
}

/* ---------- Skip Link ---------- */

.skip-link {
    position: absolute;
    left: -9999px;
}

.skip-link:focus {
    left: 1rem;
    top: 1rem;

    background: white;
    color: black;

    padding: .5rem 1rem;
}

/* ---------- Layout ---------- */

header,
main,
footer {

    max-width: 900px;

    margin: 0 auto;

    padding: 1.5rem;

}

/* ---------- Headings ---------- */

h1 {

    margin-top: 0;

    font-size: 2.5rem;

}

h2 {

    margin-top: 0;

}

.tagline {

    color: #bbbbbb;

    margin-bottom: 2rem;

}

/* ---------- Intro ---------- */

.intro {

    margin-bottom: 2rem;

}

/* ---------- Project Grid ---------- */

.project-grid {

    display: grid;

    grid-template-columns: 1fr;

    gap: 1rem;

}

/* ---------- Cards ---------- */

.card {

    background-color: rgba(34,34,34,0.85);

    border: 1px solid #444444;

    padding: 1rem;

    border-radius: 8px;

}

.card:hover {

    border-color: white;

}

/* ---------- Links ---------- */

a {

    color: #66ccff;

    text-decoration: none;

}

a:hover {

    text-decoration: underline;

}

a:focus {

    outline: 2px solid white;

    outline-offset: 3px;

}

/* ---------- Footer ---------- */

footer {

    color: #999999;

    font-size: .9rem;

}

/* ---------- Responsive Layout ---------- */

@media screen and (min-width: 700px) {

    .project-grid {

        grid-template-columns: 1fr 1fr;

    }

}

@media screen and (min-width: 1000px) {

    .project-grid {

        grid-template-columns: repeat(3, 1fr);

    }

}

/* ---------- Matrix Background ---------- */

#matrixCanvas {

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    z-index: 0;

    pointer-events: none;
}


header,
main,
footer {

    position: relative;

    z-index: 1;

}