import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { loginSuccess } from "../../redux/auth-slice";
import { fetchCartApi } from "../../utils/cartApi";
import { setCart } from "../../redux/cart-slice";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tokenParam = searchParams.get("token");

    if (!tokenParam) {
      navigate("/login");
      return;
    }

    const token: string = tokenParam;
    const roleParam = searchParams.get("role");

    async function handleOAuthLogin() {
      try {
      dispatch(
        loginSuccess({
          token,
          email: "google-user",
          role: roleParam || "USER",
        })
      );

        const cartData = await fetchCartApi();
        dispatch(setCart(cartData));

        navigate("/", { replace: true });
      } catch (error) {
        console.error("OAuth login failed:", error);
        navigate("/login");
      }
    }

    handleOAuthLogin();
  }, [searchParams, dispatch, navigate]);

  return (
    <p style={{ textAlign: "center" }}>
      Signing you in...
    </p>
  );
}