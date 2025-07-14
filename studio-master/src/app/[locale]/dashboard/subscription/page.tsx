
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscriptionPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  const t = useTranslations('SubscriptionPage');

  const plans = [
    {
        id: "price_1PJbFHA9g9dyJIXR8IdrTQQV",
        name: t('monthlyPlan.name'),
        price: "$29",
        pricePeriod: t('monthlyPlan.pricePeriod'),
        description: t('monthlyPlan.description'),
        features: [
            t('monthlyPlan.feature1'),
            t('monthlyPlan.feature2'),
            t('monthlyPlan.feature3'),
        ],
        isRecommended: false,
    },
    {
        id: "price_1PJbFHA9g9dyJIXRB0qA01aD",
        name: t('yearlyPlan.name'),
        price: "$299",
        pricePeriod: t('yearlyPlan.pricePeriod'),
        description: t('yearlyPlan.description'),
        features: [
            t('yearlyPlan.feature1'),
            t('yearlyPlan.feature2'),
            t('yearlyPlan.feature3'),
            t('yearlyPlan.feature4'),
        ],
        isRecommended: true,
    }
  ];

  const handleChoosePlan = async (planId: string) => {
    if (!user) {
      toast({ variant: "destructive", title: "You must be logged in to choose a plan." });
      return;
    }
    setLoading(planId);
    
    try {
      const checkoutSessionRef = collection(db, "customers", user.uid, "checkout_sessions");
      
      const docRef = await addDoc(checkoutSessionRef, {
        price: planId,
        success_url: window.location.origin + "/dashboard",
        cancel_url: window.location.href,
      });

      onSnapshot(docRef, async (snap) => {
        const { error, url } = snap.data() as { error?: { message: string }, url?: string };

        if (error) {
          console.error(`An error occurred: ${error.message}`);
          toast({ variant: "destructive", title: "Payment Error", description: error.message });
          setLoading(null);
        }

        if (url) {
          window.location.assign(url);
        }
      });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not create checkout session."});
        setLoading(null);
    }
  };

  return (
    <div className="flex flex-col items-center">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">{t('title')}</h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
                {t('subtitle')}
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            {plans.map(plan => (
                <Card key={plan.name} className={`flex flex-col ${plan.isRecommended ? 'border-primary shadow-lg' : ''}`}>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                         <div className="flex items-baseline pt-4">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.pricePeriod}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="space-y-3">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={plan.isRecommended ? 'default' : 'outline'}
                          onClick={() => handleChoosePlan(plan.id)}
                          disabled={!!loading}
                        >
                            {loading === plan.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading === plan.id ? t('loadingButton') : (plan.isRecommended ? t('recommendedButton') : t('defaultButton'))}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  )
}
