const FALA_ROOT_ID = "fala-root";

const TAGS = [
    "a","abbr","address","area","article","aside","audio",
    "b","base","bdi","bdo","blockquote","body","br","button",
    "canvas","caption","cite","code","col","colgroup",
    "data","datalist","dd","del","details","dfn","dialog","div","dl","dt",
    "em","embed",
    "fieldset","figcaption","figure","footer","form",
    "h1","h2","h3","h4","h5","h6","head","header","hr","html",
    "i","iframe","img","input","ins",
    "kbd",
    "label","legend","li","link",
    "main","map","mark","meta","meter",
    "nav","noscript",
    "object","ol","optgroup","option","output",
    "p","param","picture","pre","progress",
    "q",
    "rp","rt","ruby",
    "s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup",
    "table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track",
    "u","ul",
    "var","video",
    "wbr"
];

for (const tag of TAGS) {
    window[tag] = (...nodes) => Fala.createElement(tag, ...nodes);
}

window.addEventListener("hashchange", () => {
    Fala.handleRouteChange();
});

const Fala = {
    _rootFunc: null,
    _states: {},
    _stateCursor: 0,
    _router: null,
    
    changeRoot: (createRootFunc) => {
        Fala._rootFunc = createRootFunc;
        Fala.refresh();
    },

    handleRouteChange: () => {
        let path = window.location.hash.slice(1);

        if (!path) path = "/";

        const route = Fala._router[path];

        Fala.changeRoot(route ?? (() => h1("404 Not Found")));
    },
    
    refresh: () => {
        document.getElementById(FALA_ROOT_ID)?.remove();
        Fala._stateCursor = 0;  

        const r = div(Fala._rootFunc(), {id: FALA_ROOT_ID});
        document.body.appendChild(r);
    },
    
    createElement: (name, ...nodes) => {
        const elm = document.createElement(name);

        for (const node of nodes) {
            let child;

            if (typeof(node) === "string") {
                child = document.createTextNode(node);
            } else {
                if (node instanceof HTMLElement) {
                    child = node;
                } else {
                    for (const key of Object.keys(node)) {
                        elm[key] = node[key];
                    }
                    continue;
                }
            }
            
            elm.appendChild(child);
        }
        
        return elm;
    },
    
    createState: (initialValue) => {
        const id = Fala._stateCursor;
        Fala._stateCursor++;
        if (!Object.hasOwn(Fala._states, id)) {
            Fala._states[id] = initialValue;
        }
        return id
    },
    
    getState: (id) => {
        return Fala._states[id];
    },
    
    setState: (id, value) => {
        Fala._states[id] = value;
        Fala.refresh();
    },
}

function remember(value) {
    const id = Fala.createState(value);
    return {
        get: () => {
            return Fala.getState(id);
        },
        set: (newValue) => {
            Fala.setState(id, newValue);
        }
    }
}

function createRouter(map) {
    Fala._router = map;
    Fala.handleRouteChange();
}
