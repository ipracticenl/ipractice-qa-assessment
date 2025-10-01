using iPractice.Api.Models.Psychologists;
using iPractice.Api.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.UseCases.Psychologists;

public class DeleteAvailableTimeSlotCommand(long psychologistId, string timeSlotId) : IRequest<Psychologist>
{
    public long PsychologistId { get; } = psychologistId;
    public string TimeSlotId { get; } = timeSlotId;
}

public class DeleteAvailableTimeSlotHandler(IPsychologistSqlRepository psychologistSqlRepository) : IRequestHandler<DeleteAvailableTimeSlotCommand, Psychologist>
{
    public async Task<Psychologist> Handle(DeleteAvailableTimeSlotCommand request, CancellationToken cancellationToken)
    {
        var psychologist = await psychologistSqlRepository.GetPsychologistByIdAsync(request.PsychologistId, cancellationToken);

        psychologist.CancelAvailableTimeSlot(request.TimeSlotId);

        await psychologistSqlRepository.SaveChangesAsync(cancellationToken);

        return psychologist;
    }
} 