interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

const EmptyStateCreatorStore = ({ message, subMessage }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center h-full">
    <img src="/images/profile-empty-state.svg" alt="Empty State" className="" />
    <div className="text-cultureWhite text-sm flex font-groteskSemiBold">
      {message}
    </div>
    {subMessage && (
      <div className="text-sm flex text-cultureBeige font-groteskRegular">
        {subMessage}
      </div>
    )}
  </div>
);

export default EmptyStateCreatorStore;
