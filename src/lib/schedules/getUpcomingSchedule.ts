import { isAfter, isWithinInterval, compareAsc } from "date-fns";

/**
 * Get the upcoming schedule based on:
 * 1. Active session
 * 2. Ongoing schedule (start <= now <= end)
 * 3. Nearest future start_at
 *
 * Returns `null` if no upcoming schedule exists.
 */
export function getUpcomingSchedule(
	schedules: Schedule[],
	sessions: SessionDetails[]
): Schedule | null {
	const now = new Date();

	if (!schedules || schedules.length === 0) return null;

	// 1. ACTIVE SESSION HAS HIGHEST PRIORITY
	const activeSession = sessions?.find(
		(session) => session.status === "active"
	);
	const activeSchedule = schedules.find(
		(schedule) => schedule.id === activeSession?.schedule_id
	);
	if (activeSchedule) return activeSchedule;

	// 2. CHECK FOR ONGOING SCHEDULES (start_at <= now <= end_at)
	const ongoingSchedule = schedules.find((schedule) => {
		if (!schedule.end_at) return false;

		return isWithinInterval(now, {
			start: schedule.start_at,
			end: schedule.end_at,
		});
	});
	if (ongoingSchedule) return ongoingSchedule;

	// 3. GET NEAREST FUTURE SCHEDULE (start_at > now)
	const futureSchedules = schedules
		.filter((schedule) => {
			return isAfter(schedule.start_at, now);
		})
		.sort((a, b) => compareAsc(a.start_at, b.start_at));

	return futureSchedules[0] || null;
}
