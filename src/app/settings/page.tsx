// import DarkLightToggleTemplate from "@/components/templates/buttons/DarkLightToggleTemplate";
import ThemeToggle from "@/components/buttons/ThemeToggle";
import { ThemeModeProvider } from "@/components/buttons/ThemeModeContext";
import DarkLightToggle from "@/components/buttons/DarkLightToggle";

export default function Page() {
    return (
        <ThemeModeProvider>
            <h1>settings page placeholder</h1>
            <DarkLightToggle />
            <ThemeToggle />
        </ThemeModeProvider>
    );
}