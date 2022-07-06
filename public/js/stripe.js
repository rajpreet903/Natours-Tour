/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51LIVgISISls5CiUx3mz8mD4EZk52SZ2Gd1HUDdVNsic4kJkTHi2xndBosk3X8DmrRygYYN8TQLzkwfY0KLa8nxkS00yLMHaNIN'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};