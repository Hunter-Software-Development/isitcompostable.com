import { HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList } from "baseui/header-navigation";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";

import Bulb from "./bulb";
import { Heading, HeadingLevel } from "baseui/heading";
import { StyledLink } from "baseui/link";
import GithubLogo from "./githubLogo";
import Search from "./search";

const Header = ({ toggleDarkMode, theme, THEME, home, allPostsData }: { toggleDarkMode: Function; theme: string; THEME: any; home?: boolean; allPostsData: any }) => {
    return (
        <HeaderNavigation>
            <NavigationList $align={ALIGN.left}>
                {!home && (
                    <div style={{ width: "240px", maxWidth: "40vw" }}>
                        <NavigationItem>
                            <Search allPostsData={allPostsData} size="compact" />
                        </NavigationItem>
                    </div>
                )}
            </NavigationList>
            <NavigationList $align={ALIGN.center}></NavigationList>

            <NavigationList $align={ALIGN.right}>
                <NavigationItem>
                    
                </NavigationItem>
                <NavigationItem>
                    <Button
                        $as="a"
                        href="https://github.com/Hunter-Software-Development/isitcompostable.com"
                        target="_blank"
                        size={SIZE.compact}
                        kind={KIND.tertiary}
                        shape={SHAPE.square}
                        title="GitHub"
                        overrides={{
                            BaseButton: {
                                style: {
                                    display: "flex",
                                },
                            },
                        }}
                    >
                        <GithubLogo size={24} color={theme === THEME.light ? "black" : "white"} />
                    </Button>
                </NavigationItem>
                <NavigationItem>
                    <Button
                        onClick={() => toggleDarkMode()}
                        size={SIZE.compact}
                        kind={KIND.tertiary}
                        shape={SHAPE.square}
                        title="Toggle theme"
                        overrides={{
                            BaseButton: {
                                style: {
                                    display: "flex",
                                },
                            },
                        }}
                    >
                        <Bulb size={24} color={theme === THEME.light ? "black" : "white"} />
                    </Button>
                </NavigationItem>
            </NavigationList>
        </HeaderNavigation>
    );
};

export default Header;
