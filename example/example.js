function ClickButton() {
    const counter = remember(0);
    
    function handleClick() {
        counter.set(counter.get() + 1)
    }
    
    return div(
        button(
            "Click me!", {onclick: handleClick}
        ),
        div(`Count: ${counter.get()}`),
    )
}

function LandingPage() {
    return div(
        h1("Welcome to My Site!"),
        ClickButton(),
    )
}

Fala.createRoot(LandingPage);
