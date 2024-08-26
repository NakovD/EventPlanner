import { IAttendee } from 'features/attendees/models/attendee';
import { ButtonLink } from 'features/common/button/ButtonLink';
import { ExpandableSection } from 'features/common/expandableSection/ExpandableSection';
import { routePaths } from 'infrastructure/routing/routePaths';
import { replacePlaceholderWithId } from 'infrastructure/utilities/replacePlaceholderWithId';

interface IEventAttendeesListProps {
  eventId: number;
  canEdit: boolean;
  attendees: IAttendee[];
}

export const EventAttendeesList = ({
  eventId,
  canEdit,
  attendees,
}: IEventAttendeesListProps) => {
  return (
    <ExpandableSection sectionName="Attendees">
      <div className="flex gap-5 flex-col">
        {attendees.map((a) => (
          <div key={a.id} className="flex gap-4">
            <p>Name: {a.name}</p>
            <p>Status: {a.status}</p>
          </div>
        ))}
      </div>
      {canEdit && (
        <ButtonLink
          className="mt-5"
          label="Manage attendees"
          to={replacePlaceholderWithId(routePaths.manageAttendees.path, eventId)}
        />
      )}
    </ExpandableSection>
  );
};
