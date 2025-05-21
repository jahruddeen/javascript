// Sample offer string as seen on Flipkart
const offerString = "Buy 2 items save ₹20; Buy 3 or more save ₹40";

// Step 1: Parse the offer string to extract the offer rules
function parseOffers(offerText) {
    const offers = [];

    // Split offers by semicolon
    const parts = offerText.split(";");

    for (let part of parts) {
        part = part.trim();

        // Regex to extract offer values
        const regex = /Buy (\d+)(?: or more)? .*save ₹(\d+)/;
        const match = part.match(regex);

        if (match) {
            const quantity = parseInt(match[1]);
            const discount = parseInt(match[2]);

            const isOrMore = part.includes("or more");

            offers.push({
                quantity,
                discount,
                isOrMore
            });
        }
    }

    return offers;
}

// Step 2: Calculate discount based on items in cart
function calculateDiscount(offers, quantityBought) {
    let applicableDiscount = 0;

    for (const offer of offers) {
        if (offer.isOrMore) {
            if (quantityBought >= offer.quantity) {
                applicableDiscount = Math.max(applicableDiscount, offer.discount);
            }
        } else {
            if (quantityBought === offer.quantity) {
                applicableDiscount = Math.max(applicableDiscount, offer.discount);
            }
        }
    }

    return applicableDiscount;
}

// Step 3: Simulate a shopping cart and apply discount

