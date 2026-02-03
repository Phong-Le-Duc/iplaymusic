import { ThemeModeProvider } from "@/components/buttons/ThemeModeContext";
import DarkLightToggle from "@/components/buttons/DarkLightToggle";
import ThemeToggle from "@/components/buttons/ThemeToggle";

export default function Page() {
    return (
        <ThemeModeProvider>
            <section className="">
                <p className="text-center">Themes</p>
                <div className="mx-auto mt-4 flex w-max flex-col gap-4">
                    <DarkLightToggle />
                    <ThemeToggle />
                </div>
            </section>
        </ThemeModeProvider >
    );
}