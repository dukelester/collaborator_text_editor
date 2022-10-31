import React from 'react'
import * as ReactDOM from 'react-dom';

import Editor from "./Editor";

describe("testing the App component ", () =>{
    let container: HTMLDivElement;
    beforeEach(() =>{
        container = document.createElement("div");
        document.body.appendChild(container);
        ReactDOM.render(<Editor/>, container);
    });
    afterEach(() =>{
        document.body.removeChild(container);
        container.remove();
    });

    it("Renders correctly initial textarea", ()=>{
        const textarea = container.querySelectorAll("textarea");
        expect(textarea).toHaveLength(1)

    });
    it("The  type of the textarea should be text", () =>{
        const textarea = container.querySelectorAll("textarea");
        expect(textarea[0].name).toBe('text')
    });
    it("The place holder should be visible", () =>{
        const textarea = container.querySelectorAll("textarea");
        expect(textarea[0].placeholder).toBe("Type Your Text...")
    });
    it("Should display the online users heading", () =>{
        const header = container.querySelectorAll("h3");
        expect(header).toHaveLength(1);
        expect(header[0].textContent).toMatch(/Online users/)
    });

    it("Should enable a user to type in the textarea", () =>{
        const textarea = container.querySelectorAll("textarea");
        expect(textarea[0].innerText)
    })

});