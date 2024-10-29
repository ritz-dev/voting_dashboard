import Link from "@/components/ui/link";
import { siteSettings } from "@/settings/site.setting";
import Image from "next/image";
import cn from 'classnames';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import { useAtom } from "jotai";
import { miniSidebarInitialValue, RESPONSIVE_WIDTH } from "@/utils/constants";

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
    className,
    ...props
}) => {

    const router = useRouter();
    const currentRoute = router.pathname;

    const [imageSize,setImageSize] = useState(true);
    const [miniSidebar, _] = useAtom(miniSidebarInitialValue);

    const { width } = useWindowSize();

    useEffect(()=>{
        if(currentRoute.includes('login')) {
            setImageSize(false);
        } else {
            setImageSize(true);
        }
    },[currentRoute]);

    return (
        
        <Link
            href={siteSettings?.logo?.href}
            className={cn('inline-flex items-center gap-3',className)}
        >
            {
                !imageSize ? (
                    <span
                        className="relative overflow-hidden"
                        style={{
                            width: siteSettings.LoginLogo.width,
                            height: siteSettings.LoginLogo.height
                        }}
                    >
                        <Image
                            src={siteSettings.LoginLogo.url}
                            alt={siteSettings.LoginLogo.alt}
                            fill
                            sizes="(max-width: 768px) 100vw"
                            className="objext-contain"
                            loading="eager"
                            priority
                        />
                    </span>
                ) : (
                    <>
                        {miniSidebar && width >= RESPONSIVE_WIDTH ? (
                        <span
                        className="relative overflow-hidden"
                        style={{
                            width: siteSettings.collapseLogo.width,
                            height: siteSettings.collapseLogo.height
                        }}
                        >
                            <Image
                                src={siteSettings.collapseLogo.url}
                                alt={siteSettings.collapseLogo.alt}
                                fill
                                sizes="(max-width: 768px) 100vw"
                                className="objext-contain"
                                loading="eager"
                                priority
                            />
                        </span>
                    ) : (
                        <span
                            className="relative overflow-hidden"
                            style={{
                                width: siteSettings.logo.width,
                                height: siteSettings.logo.height
                            }}
                        >
                            <Image
                                src={siteSettings.logo.url}
                                alt={siteSettings.logo.alt}
                                fill
                                sizes="(max-width: 768px) 100vw"
                                className="objext-contain"
                                loading="eager"
                                priority
                            />
                        </span>
                        
                    )}
                    </>
                )
            }
            
            
        </Link>
    )
}

export default Logo;