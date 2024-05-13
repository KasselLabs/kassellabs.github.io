import {
  useMemo, useState, useEffect,
} from 'react';
import kasselApi from '../kasselApi';
import { OTHER_INTROS } from '../contants/intros';

export default function useIntroData(introId, { onNotFound }) {
  const [introData, setIntroData] = useState(null);

  const intro = useMemo(() => (
    OTHER_INTROS.find((currentIntro) => currentIntro.slug === introData?.type)
  ), [introData]);

  const checkedOptionals = useMemo(() => {
    const checkedOptionalsSet = new Set(introData?.optionals);
    return intro?.optionals.filter((o) => checkedOptionalsSet.has(o.id));
  }, [intro, introData]);

  const price = useMemo(() => {
    const basePrice = intro?.price(introData);
    return basePrice + checkedOptionals?.reduce((accumulated, current) => (
      accumulated + current.price
    ), 0);
  }, [intro, introData, checkedOptionals]);

  useEffect(() => {
    if (!introId) {
      return;
    }

    kasselApi.request({
      url: `/api/intro/${introId}`,
    }).then((response) => {
      setIntroData(response.data);
    }).catch((error) => {
      const is404 = error.response?.status === 404;
      if (is404 && onNotFound) {
        onNotFound();
      }
    });
  }, [introId]);

  return {
    intro,
    introData,
    price,
  };
}
