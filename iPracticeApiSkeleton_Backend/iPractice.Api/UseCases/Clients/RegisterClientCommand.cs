using iPractice.Api.Models.Clients;
using iPractice.Api.Repositories;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace iPractice.Api.UseCases.Clients;

public class RegisterClientCommand(string name, List<long> initialPsychologists) : IRequest<Client>
{
    public string Name { get; } = name;
    public List<long> InitialPsychologists { get; } = initialPsychologists;
}

public class RegisterClientHandler(IClientSqlRepository clientSqlRepository, IPsychologistSqlRepository psychologistSqlRepository) : IRequestHandler<RegisterClientCommand, Client>
{
    public async Task<Client> Handle(RegisterClientCommand request, CancellationToken cancellationToken)
    {
        var client = Client.Create(request.Name, request.InitialPsychologists);

        await clientSqlRepository.AddClientAsync(client, cancellationToken);

        // Update the AssignedClientIds for all selected psychologists
        if (request.InitialPsychologists.Any())
        {
            var psychologists = await psychologistSqlRepository.GetPsychologistsByIdsAsync(request.InitialPsychologists, cancellationToken);
            
            foreach (var psychologist in psychologists)
            {
                psychologist.AssignNewClient(client.Id);
            }
            
            await psychologistSqlRepository.SaveChangesAsync(cancellationToken);
        }

        return client;
    }
}