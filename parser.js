
function jsonToHTML(json, s) {
    const program = new Program(json, s, {});

    console.log(program.jsonToHTML());
}

class Program {

    constructor(json, s, HTMLObject) {
        this.json = json;
        this.s = s;
        this.HTMLObject = HTMLObject;
    }

    convertJSONToObject(json) {
        return this.HTMLObject = JSON.parse(json);
    }

    getRootElement() {
        const root = this.HTMLObject?.tag;

        return [`<${root}`, `<${root}/>`];
    }

    getElement(HTMLObject) {
        const element = HTMLObject?.tag;

        if (HTMLObject?.children.length > 0)
            return [`<${element}`, `<${element}/>`];
        else
            return [`<${element}`, `/>`];
    }

    getIdString(attrs) {

        let idString = " id=";
        const strOfIdNames = attrs?.id;

        idString += `"${strOfIdNames}"`;

        if (strOfIdNames === "" || strOfIdNames == null)
            return "";

        return idString;
    }

    getClassString(attrs) {

        let classString = " class=";
        const strOfClassNames = attrs?.class;

        classString += `"${strOfClassNames}"`;

        if (strOfClassNames === "" || strOfClassNames == null)
            return "";

        return classString;
    }

    getAttrs(attrs) {

        let attrString = "";

        attrString += this.getIdString(attrs);

        attrString += this.getClassString(attrs);

        return attrString;
    }

    build(children, indentLevel) {

        for (let i = 0; i < children.length; i += 2) {

            const child = children[i];
            const attrs = this.getAttrs(child?.attrs);
            const [openTag, closeTag] = this.getElement(child);
            const text = children[i + 1];

            this.s += '\n';

            this.s += "  ".repeat(indentLevel);

            this.s += openTag;

            this.s += attrs;

            if (child?.children?.length >= 1 || text)
                this.s += '>';

            if (child?.children?.length >= 1) {

                // recursive step to build all possible child nodes
                this.build(child?.children, indentLevel + 1);
            }

            if (child?.children?.length >= 1) {
                this.s += "\n";
                this.s += "  ".repeat(indentLevel);
            }

            if (text)
                this.s += text;

            if (child?.children?.length >= 1) {
                this.s += "\n";
                this.s += "  ".repeat(indentLevel);
            }

            this.s += closeTag;
        }

        return;
    }

    wrap(childrenTags) {
        let [openTag, closeTag] = this.getRootElement();

        let attrs = this.getAttrs(this.HTMLObject?.attrs);

        openTag += attrs;

        openTag += ">";

        openTag += childrenTags;

        openTag += "\n";

        openTag += closeTag;

        return openTag;
    }

    jsonToHTML() {

        this.convertJSONToObject(this.json);

        // build child elements
        this.build(this.HTMLObject?.children, 1);

        // wrap root element around child elements
        return this.wrap(this.s);
    }
}

/* #############################  TEST CASES ###########################################################################*/

// const input = {
//     tag: "body",
//     attrs: { id: "a b c", class: "b" },
//     children: [
//         // 1
//         {
//             tag: "div",
//             attrs: { id: "a b c", class: "b" },
//             children: [
//                 {
//                     tag: "p",
//                     attrs: { id: "", class: "" },
//                     children: [
//                         {
//                             tag: "span",
//                             attrs: { id: "a b c", class: "b" },
//                             children: []
//                         }
//                     ]
//                 },

//                 "Hello",

//                 {
//                     tag: "h1",
//                     attrs: { id: "a", class: "b" },
//                     children: [
//                         {
//                             tag: "span",
//                             attrs: { id: "a", class: "b" },
//                             children: []
//                         },

//                         "World"
//                     ]
//                 },

//                 ""
//             ]
//         },
//         // 2

//         "",

//         {
//             tag: "div",
//             attrs: { id: "a", class: "b" },
//             children: [
//                 {
//                     tag: "div",
//                     attrs: { id: "a", class: "b" },
//                     children: [
//                         {
//                             tag: "div",
//                             attrs: { id: "a", class: "b" },
//                             children: []
//                         },

//                         ""
//                     ]
//                 },

//                 ""
//             ]
//         },

//         "I Love HTML, you can put text inside divs!"
//     ]
// }

// const input = {
//     tag: "div",
//     attrs: { class: "chalk-yellow bg-blue flex-center" },
//     children: [
//         {
//             tag: "p",
//             attrs: {},
//             children: []
//         },
//         "Hello World!"
//     ],
// };

// jsonToHTML(JSON.stringify(input), "");

