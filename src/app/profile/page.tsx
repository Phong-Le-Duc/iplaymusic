import { ThemeModeProvider } from "@/components/buttons/ThemeModeContext";
import DarkLightToggle from "@/components/buttons/DarkLightToggle";
import ThemeToggle from "@/components/buttons/ThemeToggle";

export default function Page() {
    return (
        <ThemeModeProvider>
            <section>
                <h2>Themes</h2>
                <DarkLightToggle />
                <ThemeToggle />
            </section>
        </ThemeModeProvider>
    );
}