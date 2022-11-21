import * as React from "react";

function useScript(src: string) {
    // Keep track of script status ("idle", "loading", "ready", "error")
    const [status, setStatus] = React.useState(src ? "loading" : "idle");
    React.useEffect(
        () => {
            // Allow falsy src value if waiting on other data needed for
            // constructing the script URL passed to this hook.
            if (!src) {
                setStatus("idle");
                return;
            }
            // Fetch existing script element by src
            // It may have been added by another intance of this hook
            let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;
            if (!script) {
                // Create script
                script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.setAttribute("data-status", "loading");
                // Add script to document body
                document.body.appendChild(script);
                // Store status in attribute on script
                // This can be read by other instances of this hook
                const setAttributeFromEvent = (event: any) => {
                    script.setAttribute("data-status", event.type === "load" ? "ready" : "error");
                };
                script.addEventListener("load", setAttributeFromEvent);
                script.addEventListener("error", setAttributeFromEvent);
            } else {
                // Grab existing script status from attribute and set to state.
                // @ts-expect-error
                setStatus(script.getAttribute("data-status"));
            }
            // Script event handler to update status in state
            // Note: Even if the script already exists we still need to add
            // event handlers to update the state for *this* hook instance.
            const setStateFromEvent = (event: any) => {
                setStatus(event.type === "load" ? "ready" : "error");
            };
            // Add event listeners
            script.addEventListener("load", setStateFromEvent);
            script.addEventListener("error", setStateFromEvent);
            // Remove event listeners on cleanup
            return () => {
                if (script) {
                    script.removeEventListener("load", setStateFromEvent);
                    script.removeEventListener("error", setStateFromEvent);
                }
            };
        },
        [src] // Only re-run effect if script src changes
    );
    return status;
}

export function ReactCusdis(props: {
    attrs: {
        host: string;
        appId: string;
        pageId: string;
        pageTitle?: string;
        pageUrl?: string;
        theme?: "light" | "dark" | "auto";
    };
    lang?: string;
    style?: React.CSSProperties;
}) {
    const divRef = React.useRef<HTMLDivElement>(null);

    const host = props.attrs.host || "https://cusdis.com";

    useScript(`${host}/js/cusdis.es.js`);
    useScript(props.lang ? `${host}/js/widget/lang/${props.lang}.js` : "");

    React.useLayoutEffect(() => {
        // @ts-expect-error
        const render = window.renderCusdis;

        if (render) {
            render(divRef.current);
        }
    }, [props.attrs.appId, props.attrs.host, props.attrs.pageId, props.attrs.pageTitle, props.attrs.pageUrl, props.lang]);

    return (
        <>
            <div id="cusdis_thread" data-host={host} data-page-id={props.attrs.pageId} data-app-id={props.attrs.appId} data-page-title={props.attrs.pageTitle} data-page-url={props.attrs.pageUrl} data-theme={props.attrs.theme} style={props.style} ref={divRef}></div>
        </>
    );
}
