using iPractice.Api.Models.Clients;
using iPractice.Api.Repositories;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace iPractice.Api.UseCases.Clients;

public class GetClientByNameQuery(string clientName) : IRequest<Client>
{
    public string ClientName { get; } = clientName;
}

public class GetClientByNameHandler(IClientSqlRepository clientSqlRepository) : IRequestHandler<GetClientByNameQuery, Client>
{
    public async Task<Client> Handle(GetClientByNameQuery request, CancellationToken cancellationToken) =>
        await clientSqlRepository.GetClientByNameAsync(request.ClientName, cancellationToken);
} 