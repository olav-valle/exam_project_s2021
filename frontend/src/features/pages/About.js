import React from 'react';

/*  TODO: http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/ for fun!  */

function About() {
    const paragraphStyle = "pb-4"
    const ulStyle = "list-disc pl-16 pb-4"
    const h2Style = "font-bold text-xl"
    return (
        <div className="flex flex-col mx-auto max-w-2xl leading-relaxed">
            <h1 className="font-bold text-3xl">About us</h1>
            <p className={paragraphStyle}>
                This store combines two 4th semester exam projects from courses at NTNU Ålesund; "Application
                Development" (IDATA2306, "AppDev") and "Web Technology" (IDATA2301, "WebTek").
            </p>
            <h2 className={h2Style}>Application Development</h2>
            <p className={paragraphStyle}>The goal of the AppDev project was to implement the backend for a web shop. The requirement was to
                support a typical online shopping process, from the user entering the shop webpage, to final order
                generation through some form of UI. The fulfilment of this included:


            </p>
            <ul className={ulStyle}>
                <li>A REST API and item/warehouse DB</li>
                <li>A rudimentary login system</li>
                <li>A rudimentary user administration system</li>
                <li>User session handling (shopping cart management)</li>
                <li>A simplified mock payment system.</li>
            </ul>

            <h2 className={h2Style}>Web Technology</h2>
            <p className={paragraphStyle}>
                The goal of the WebTek project was to design a dynamic web site, the exact details of which were left
                open. The requirements were that the final product fulfilled certain conditions. It should:
            </p>
            <ul className={ulStyle}>
                <li>Be a dynamic frontend/web application.</li>
                <li>Fetch data from an external API.</li>
                <li>Support basic CRUD operations (if possible).</li>
                <li>Be a "meaningful" product, i.e. something functional, with "a story behind the concept".</li>
                <li>Have a focus on accessibility and user privacy.</li>
                <li>Utilise some form of Javascript UI framework (React, Vue, Svelte...)</li>
            </ul>
            <p className={paragraphStyle}>
                Our chosen goal became to implement the frontend for a web shop in React. As these requirements fit well
                with the functionality required by the AppDev project, it was logical to combine the two projects. This
                approach was also recommended by the course lecturers, Girts Strazdins, PhD (IDATA2301) and Di Wu
                (IDATA2306)</p>
        </div>
    );
}

export default About;