export const pdpQuery = `
		query {
			faqs {
				question
				answer
			}
			prices {
				vehicle
				pricePerKm
				pricePerHour
				travelers
				description
			}
			testimonials {
				content
				author
				company
			}
			routes {
				distanceInKm
				description
				additionalCosts
				images {
					url
				}
				from {
					name
				}
				to {
					name
				}
			}
		}
  `;
