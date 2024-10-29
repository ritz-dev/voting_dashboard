import ActionButtons from '@/components/common/action-buttons';
import { Config } from '@/config';
// import LanguageAction from './language-switcher';
import { useRouter } from 'next/router';
import { CheckMarkCircle } from '@/components/icons/checkmark-circle';
import { CloseFillIcon } from '@/components/icons/close-fill';
// import { useModalAction } from '../modal/modal.context';

export type LanguageSwitcherProps = {
  record: any;
  slug: string;
  deleteModalView?: string | any;
  routes: any;
  className?: string | undefined;
  detailsUrl?: string;
  enablePreviewMode?: boolean;
  isShop?: boolean;
  shopSlug?: string;
  couponApproveButton?: boolean;
  isCouponApprove?: boolean;
  previewUrl ?: string;
};

export default function LanguageSwitcher({
  record,
  slug,
  deleteModalView,
  routes,
  detailsUrl,
  className,
  enablePreviewMode,
  isShop,
  shopSlug,
  couponApproveButton,
  isCouponApprove,
  previewUrl
}: LanguageSwitcherProps) {
  const { enableMultiLang } = Config;
  const {
    query: { shop },
  } = useRouter();

  return (
    <>
      {enableMultiLang ? (
        // <LanguageAction
        //   slug={slug}
        //   record={record}
        //   deleteModalView={deleteModalView}
        //   routes={routes}
        //   className={className}
        //   enablePreviewMode={enablePreviewMode}
        //   isShop={isShop}
        //   shopSlug={shopSlug}
        //   couponApproveButton={couponApproveButton}
        //   isCouponApprove={isCouponApprove}
        // />
        null
      ) : (
        <ActionButtons
          id={record?.id}
          editUrl={routes?.editWithoutLang(slug, shop)}
          enablePreviewMode={enablePreviewMode}
          deleteModalView={deleteModalView}
          previewUrl={previewUrl}
          detailsUrl={detailsUrl}
        //   couponApproveButton={couponApproveButton}
        //   isCouponApprove={isCouponApprove}
        />
      )}
    </>
  );
}
