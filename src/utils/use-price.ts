import { useSettings } from "@/contexts/settings.context";
import { siteSettings } from "@/settings/site.setting";
import { useMemo } from "react";

// Utility function to format currency
export function formatPrice({
    amount,
    currencyCode,
    locale,
    fractions = 2,
}: {
    amount: number;
    currencyCode: string;
    locale: string;
    fractions: number;
}) {
    // Create a number formatter
    const formatCurrency = new Intl.NumberFormat(locale, {
        style: 'decimal', // Use decimal style for raw number formatting
        maximumFractionDigits:
            fractions > 20 || fractions < 0 || !fractions ? 2 : fractions,
    });

    // Format the amount
    const formattedAmount = formatCurrency.format(amount);

    // If currencyCode is MMK, append 'MMK' to the formatted amount
    if (currencyCode === 'MMK') {
        return `${formattedAmount} MMK`;
    }

    // Default behavior for other currencies
    const formatCurrencyWithSymbol = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits:
            fractions > 20 || fractions < 0 || !fractions ? 2 : fractions,
    });

    return formatCurrencyWithSymbol.format(amount);
}

// Utility function to format variant price
export function formatVariantPrice({
    amount,
    baseAmount,
    currencyCode,
    locale,
    fractions = 2,
}: {
    baseAmount: number;
    amount: number;
    currencyCode: string;
    locale: string;
    fractions: number;
}) {
    const hasDiscount = baseAmount < amount;
    const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' });
    const discount = hasDiscount
        ? formatDiscount.format((amount - baseAmount) / amount)
        : null;

    const price = formatPrice({ amount, currencyCode, locale, fractions });
    const basePrice = hasDiscount
        ? formatPrice({ amount: baseAmount, currencyCode, locale, fractions })
        : null;

    return { price, basePrice, discount };
}

// Custom hook to use formatted price
type PriceProps = {
    amount: number;
    baseAmount?: number;
    currencyCode?: string;
};

export default function usePrice(data?: PriceProps | null) {
    const { currency, currencyOptions } = useSettings();
    const { formation, fractions } = currencyOptions;
    const { amount, baseAmount, currencyCode = currency } = data ?? {};
    const locale = formation ?? siteSettings.defaultLanguage;

    // Default currency for Myanmar
    const myanmarCurrencyCode = 'MMK';

    const value = useMemo(() => {
        if (typeof amount !== 'number' || !currencyCode) return '';

        // Use Myanmar currency code if not provided
        const effectiveCurrencyCode = currencyCode === 'MMK' ? myanmarCurrencyCode : currencyCode;

        return baseAmount
            ? formatVariantPrice({
                amount,
                baseAmount,
                currencyCode: effectiveCurrencyCode,
                locale,
                fractions,
            })
            : formatPrice({ amount, currencyCode: effectiveCurrencyCode, locale, fractions });
    }, [amount, baseAmount, currencyCode, locale, fractions]);

    return typeof value === 'string'
        ? { price: value, basePrice: null, discount: null }
        : value;
}
