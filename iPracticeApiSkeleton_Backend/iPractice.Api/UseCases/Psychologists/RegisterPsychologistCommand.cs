using iPractice.Api.Models.Psychologists;
using iPractice.Api.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace iPractice.Api.UseCases.Psychologists;

public class RegisterPsychologistCommand(string name, List<long> initialClients) : IRequest<Psychologist>
{
    public string Name { get; } = name;
    public List<long> InitialClients { get; } = initialClients;
}

public class RegisterPsychologistHandler(IPsychologistSqlRepository psychologistSqlRepository, IClientSqlRepository clientSqlRepository) : IRequestHandler<RegisterPsychologistCommand, Psychologist>
{
    public async Task<Psychologist> Handle(RegisterPsychologistCommand request, CancellationToken cancellationToken)
    {
        var psychologist = Psychologist.Create(request.Name, request.InitialClients);

        await psychologistSqlRepository.AddPsychologistAsync(psychologist, cancellationToken);

        // Update the AssignedPsychologistIds for all selected clients
        if (request.InitialClients.Any())
        {
            var clients = await clientSqlRepository.GetClientsByIdsAsync(request.InitialClients, cancellationToken);
            
            foreach (var client in clients)
            {
                client.AssignNewPsychologist(psychologist.Id);
            }
            
            await clientSqlRepository.SaveChangesAsync(cancellationToken);
        }

        return psychologist;
    }
}