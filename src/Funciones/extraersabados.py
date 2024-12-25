from datetime import date, timedelta
import json
import holidays

# Generate Fridays and Saturdays between 2025 and 2030
start_date = date(2025, 1, 1)
end_date = date(2030, 12, 31)
fridays_and_saturdays = []
current_date = start_date

while current_date <= end_date:
    if current_date.weekday() in [4, 5]:  # 4 = Friday, 5 = Saturday
        fridays_and_saturdays.append(current_date.isoformat())
    current_date += timedelta(days=1)

# Generate holidays in Colombia between 2025 and 2030
colombian_holidays = []
for year in range(2025, 2031):
    for holiday in holidays.Colombia(years=year).items():
        colombian_holidays.append(holiday[0].isoformat())

# Create JSON structure
data = {
    "fridays_and_saturdays": fridays_and_saturdays,
    "colombian_holidays": sorted(colombian_holidays),
}

# Save JSON to a file
file_path = "fridays_saturdays_holidays_2025_2030.json"
with open(file_path, "w") as file:
    json.dump(data, file, indent=4)

print(f"JSON file created: {file_path}")
