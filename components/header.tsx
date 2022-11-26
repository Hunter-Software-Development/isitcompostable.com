import { HeaderNavigation, ALIGN, StyledNavigationItem as NavigationItem, StyledNavigationList as NavigationList } from "baseui/header-navigation";
import { Button, KIND, SHAPE, SIZE } from "baseui/button";

import Bulb from "./bulb";
import Link from "next/link";
import { Heading, HeadingLevel } from "baseui/heading";
import { StyledLink } from "baseui/link";

const Header = ({ toggleDarkMode, theme, THEME, home }: { toggleDarkMode: Function; theme: string; THEME: any; home?: boolean }) => {
    return (
        <HeaderNavigation>
            <NavigationList $align={ALIGN.left}>
                <NavigationItem>
                    <div style={{ width: "60px" }}></div>
                </NavigationItem>
            </NavigationList>
            <NavigationList $align={ALIGN.center}>
                {!home && (
                    <NavigationItem>
                        <HeadingLevel>
                            <HeadingLevel>
                                <Heading>
                                    <StyledLink href="/">Is It Compostable?</StyledLink>
                                </Heading>
                            </HeadingLevel>
                        </HeadingLevel>
                    </NavigationItem>
                )}
            </NavigationList>
            <NavigationList $align={ALIGN.right}>
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
