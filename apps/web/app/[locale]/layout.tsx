import "./styles.css";
import { AnalyticsProvider } from "@repo/analytics/provider";
// import { Toolbar as CMSToolbar } from "@repo/cms/components/toolbar";
import { TooltipProvider } from "@repo/design-system/components/ui/tooltip";
import { ThemeProvider } from "@repo/design-system/providers/theme";
import { fonts } from "@repo/design-system/lib/fonts";
import { cn } from "@repo/design-system/lib/utils";
// import { Toolbar } from "@repo/feature-flags/components/toolbar";
import { getDictionary } from "@repo/internationalization";
import { baseMetadata } from "@repo/seo/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export const metadata: Metadata = baseMetadata;

interface RootLayoutProperties {
  readonly children: ReactNode;
  readonly params: Promise<{
    locale: string;
  }>;
}

const RootLayout = async ({ children, params }: RootLayoutProperties) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <html
      className={cn(fonts, "scroll-smooth")}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body>
        <AnalyticsProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Header dictionary={dictionary} />
              {children}
              <Footer />
            </TooltipProvider>
          </ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
